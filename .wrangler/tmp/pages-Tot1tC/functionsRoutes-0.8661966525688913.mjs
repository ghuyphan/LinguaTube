import { onRequestOptions as __api_translate_batch_js_onRequestOptions } from "/Users/huyphan/Downloads/lingua-tube/functions/api/translate/batch.js"
import { onRequestPost as __api_translate_batch_js_onRequestPost } from "/Users/huyphan/Downloads/lingua-tube/functions/api/translate/batch.js"
import { onRequest as __api_tokenize_batch__lang__js_onRequest } from "/Users/huyphan/Downloads/lingua-tube/functions/api/tokenize-batch/[lang].js"
import { onRequest as __api_tokenize__lang__js_onRequest } from "/Users/huyphan/Downloads/lingua-tube/functions/api/tokenize/[lang].js"
import { onRequestGet as __api_translate___path___js_onRequestGet } from "/Users/huyphan/Downloads/lingua-tube/functions/api/translate/[[path]].js"
import { onRequestOptions as __api_translate___path___js_onRequestOptions } from "/Users/huyphan/Downloads/lingua-tube/functions/api/translate/[[path]].js"
import { onRequestOptions as __proxy__service____path___js_onRequestOptions } from "/Users/huyphan/Downloads/lingua-tube/functions/proxy/[service]/[[path]].js"
import { onRequest as __proxy__service____path___js_onRequest } from "/Users/huyphan/Downloads/lingua-tube/functions/proxy/[service]/[[path]].js"
import { onRequestGet as __api_auth_config_js_onRequestGet } from "/Users/huyphan/Downloads/lingua-tube/functions/api/auth-config.js"
import { onRequestOptions as __api_auth_config_js_onRequestOptions } from "/Users/huyphan/Downloads/lingua-tube/functions/api/auth-config.js"
import { onRequestGet as __api_innertube_js_onRequestGet } from "/Users/huyphan/Downloads/lingua-tube/functions/api/innertube.js"
import { onRequestOptions as __api_innertube_js_onRequestOptions } from "/Users/huyphan/Downloads/lingua-tube/functions/api/innertube.js"
import { onRequestPost as __api_innertube_js_onRequestPost } from "/Users/huyphan/Downloads/lingua-tube/functions/api/innertube.js"
import { onRequestDelete as __api_sync_js_onRequestDelete } from "/Users/huyphan/Downloads/lingua-tube/functions/api/sync.js"
import { onRequestGet as __api_sync_js_onRequestGet } from "/Users/huyphan/Downloads/lingua-tube/functions/api/sync.js"
import { onRequestOptions as __api_sync_js_onRequestOptions } from "/Users/huyphan/Downloads/lingua-tube/functions/api/sync.js"
import { onRequestPost as __api_sync_js_onRequestPost } from "/Users/huyphan/Downloads/lingua-tube/functions/api/sync.js"
import { onRequestOptions as __api_whisper_js_onRequestOptions } from "/Users/huyphan/Downloads/lingua-tube/functions/api/whisper.js"
import { onRequestPost as __api_whisper_js_onRequestPost } from "/Users/huyphan/Downloads/lingua-tube/functions/api/whisper.js"
import { onRequest as __api_endict_js_onRequest } from "/Users/huyphan/Downloads/lingua-tube/functions/api/endict.js"
import { onRequest as __api_krdict_js_onRequest } from "/Users/huyphan/Downloads/lingua-tube/functions/api/krdict.js"
import { onRequest as __api_mdbg_js_onRequest } from "/Users/huyphan/Downloads/lingua-tube/functions/api/mdbg.js"

export const routes = [
    {
      routePath: "/api/translate/batch",
      mountPath: "/api/translate",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_translate_batch_js_onRequestOptions],
    },
  {
      routePath: "/api/translate/batch",
      mountPath: "/api/translate",
      method: "POST",
      middlewares: [],
      modules: [__api_translate_batch_js_onRequestPost],
    },
  {
      routePath: "/api/tokenize-batch/:lang",
      mountPath: "/api/tokenize-batch",
      method: "",
      middlewares: [],
      modules: [__api_tokenize_batch__lang__js_onRequest],
    },
  {
      routePath: "/api/tokenize/:lang",
      mountPath: "/api/tokenize",
      method: "",
      middlewares: [],
      modules: [__api_tokenize__lang__js_onRequest],
    },
  {
      routePath: "/api/translate/:path*",
      mountPath: "/api/translate",
      method: "GET",
      middlewares: [],
      modules: [__api_translate___path___js_onRequestGet],
    },
  {
      routePath: "/api/translate/:path*",
      mountPath: "/api/translate",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_translate___path___js_onRequestOptions],
    },
  {
      routePath: "/proxy/:service/:path*",
      mountPath: "/proxy/:service",
      method: "OPTIONS",
      middlewares: [],
      modules: [__proxy__service____path___js_onRequestOptions],
    },
  {
      routePath: "/proxy/:service/:path*",
      mountPath: "/proxy/:service",
      method: "",
      middlewares: [],
      modules: [__proxy__service____path___js_onRequest],
    },
  {
      routePath: "/api/auth-config",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_config_js_onRequestGet],
    },
  {
      routePath: "/api/auth-config",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_auth_config_js_onRequestOptions],
    },
  {
      routePath: "/api/innertube",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_innertube_js_onRequestGet],
    },
  {
      routePath: "/api/innertube",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_innertube_js_onRequestOptions],
    },
  {
      routePath: "/api/innertube",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_innertube_js_onRequestPost],
    },
  {
      routePath: "/api/sync",
      mountPath: "/api",
      method: "DELETE",
      middlewares: [],
      modules: [__api_sync_js_onRequestDelete],
    },
  {
      routePath: "/api/sync",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_sync_js_onRequestGet],
    },
  {
      routePath: "/api/sync",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_sync_js_onRequestOptions],
    },
  {
      routePath: "/api/sync",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_sync_js_onRequestPost],
    },
  {
      routePath: "/api/whisper",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_whisper_js_onRequestOptions],
    },
  {
      routePath: "/api/whisper",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_whisper_js_onRequestPost],
    },
  {
      routePath: "/api/endict",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_endict_js_onRequest],
    },
  {
      routePath: "/api/krdict",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_krdict_js_onRequest],
    },
  {
      routePath: "/api/mdbg",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_mdbg_js_onRequest],
    },
  ]