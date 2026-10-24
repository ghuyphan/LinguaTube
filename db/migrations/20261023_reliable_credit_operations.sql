BEGIN;
CREATE TABLE public.transcription_credit_operations (
    job_id text PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount integer NOT NULL CHECK(amount BETWEEN 1 AND 4),
    state text NOT NULL CHECK(state IN ('charged','cancelled','refunded')),
    created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.transcription_credit_operations ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.transcription_credit_operations FROM PUBLIC,anon,authenticated;
CREATE OR REPLACE FUNCTION public.consume_transcription_credits(p_job_id text,p_user_id uuid,p_amount integer)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE v_operation public.transcription_credit_operations%ROWTYPE; v_result jsonb;
BEGIN
    IF p_job_id IS NULL OR length(p_job_id) NOT BETWEEN 1 AND 100 OR p_user_id IS NULL OR p_amount IS NULL OR p_amount NOT BETWEEN 1 AND 4 THEN RAISE EXCEPTION 'Invalid charge'; END IF;
    PERFORM pg_advisory_xact_lock(hashtextextended(p_job_id,0));
    SELECT * INTO v_operation FROM public.transcription_credit_operations WHERE job_id=p_job_id;
    IF FOUND THEN
        IF v_operation.user_id<>p_user_id OR v_operation.amount<>p_amount THEN RAISE EXCEPTION 'Charge mismatch'; END IF;
        RETURN jsonb_build_object('success',v_operation.state='charged','state',v_operation.state,
            'diamonds',(SELECT diamonds FROM public.profiles WHERE id=p_user_id));
    END IF;
    v_result := public.consume_user_diamonds(p_user_id,p_amount);
    IF v_result->>'success'='true' THEN
        INSERT INTO public.transcription_credit_operations(job_id,user_id,amount,state) VALUES(p_job_id,p_user_id,p_amount,'charged');
    END IF;
    RETURN v_result;
END;
$$;
CREATE OR REPLACE FUNCTION public.refund_transcription_credits(p_job_id text,p_user_id uuid,p_amount integer)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE v_operation public.transcription_credit_operations%ROWTYPE; v_result jsonb;
BEGIN
    IF p_job_id IS NULL OR length(p_job_id) NOT BETWEEN 1 AND 100 OR p_user_id IS NULL OR p_amount IS NULL OR p_amount NOT BETWEEN 1 AND 4 THEN RAISE EXCEPTION 'Invalid refund'; END IF;
    IF NOT EXISTS(SELECT 1 FROM auth.users WHERE id=p_user_id) THEN RETURN jsonb_build_object('success',true,'state','account_deleted'); END IF;
    PERFORM pg_advisory_xact_lock(hashtextextended(p_job_id,0));
    SELECT * INTO v_operation FROM public.transcription_credit_operations WHERE job_id=p_job_id;
    IF NOT FOUND THEN
        -- Cancel an ambiguous charge too: a late original request cannot debit after recovery.
        INSERT INTO public.transcription_credit_operations(job_id,user_id,amount,state) VALUES(p_job_id,p_user_id,p_amount,'cancelled');
        RETURN jsonb_build_object('success',true,'state','cancelled');
    END IF;
    IF v_operation.user_id<>p_user_id OR v_operation.amount<>p_amount THEN RAISE EXCEPTION 'Refund mismatch'; END IF;
    IF v_operation.state='charged' THEN
        v_result := public.refund_user_diamonds(p_user_id,p_amount);
        IF v_result->>'success' IS DISTINCT FROM 'true' THEN RAISE EXCEPTION 'Refund not applied'; END IF;
        UPDATE public.transcription_credit_operations SET state='refunded' WHERE job_id=p_job_id;
    END IF;
    RETURN jsonb_build_object('success',true,'state',CASE WHEN v_operation.state='charged' THEN 'refunded' ELSE v_operation.state END);
END;
$$;
REVOKE ALL ON FUNCTION public.consume_transcription_credits(text,uuid,integer) FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.refund_transcription_credits(text,uuid,integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.consume_transcription_credits(text,uuid,integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.refund_transcription_credits(text,uuid,integer) TO service_role;
COMMIT;
