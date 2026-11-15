#!/usr/bin/env node
/**
 * Builds public/data/vi-compounds.txt from the MIT-licensed open-dict-data/ipa-dict lexicon.
 * Extracts 2-4 syllable lowercase Vietnamese compounds and applies curated learner adjustments.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const IPA_DICT_VI_URL = 'https://raw.githubusercontent.com/open-dict-data/ipa-dict/master/data/vi_N.txt';
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, '../public/data/vi-compounds.txt');

const VALID_SYLLABLE_RE = /^[a-zàáâãèéêìíòóôõùúýăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+$/u;

// Essential learner compounds guaranteed present even if absent from Northern IPA dict.
const SUPPLEMENT = [
    'xin chào', 'cảm ơn', 'tạm biệt', 'xin lỗi', 'không có gì', 'hẹn gặp lại',
    'tiếng việt', 'tiếng anh', 'tiếng nhật', 'tiếng hàn', 'tiếng trung',
    'việt nam', 'hà nội', 'hồ chí minh', 'đà nẵng',
    'hôm nay', 'hôm qua', 'ngày mai', 'bây giờ', 'buổi sáng', 'buổi trưa', 'buổi chiều', 'buổi tối',
    'cuối tuần', 'tuần này', 'tuần trước', 'tuần sau', 'tháng này', 'năm nay',
    'bao nhiêu', 'thế nào', 'tại sao', 'vì sao', 'vì vậy', 'cho nên', 'bởi vì',
    'mặc dù', 'tuy nhiên', 'ngoài ra', 'thậm chí', 'không những', 'mà còn',
    'học sinh', 'sinh viên', 'giáo viên', 'giảng viên', 'bác sĩ', 'kỹ sư', 'nhân viên',
    'gia đình', 'bạn bè', 'bố mẹ', 'anh chị', 'ông bà',
    'thành phố', 'bệnh viện', 'siêu thị', 'nhà hàng', 'khách sạn', 'sân bay', 'nhà ga',
    'giới thiệu', 'chuẩn bị', 'quyết định', 'giải thích', 'hiểu biết', 'thú vị', 'tuyệt vời',
    'quan trọng', 'đặc biệt', 'thường xuyên', 'bình thường', 'hạnh phúc', 'kinh nghiệm',
    'chẳng hạn', 'đối với', 'vốn dĩ', 'thành ra', 'thành thử', 'hóa ra', 'tóm lại', 'trái lại',
    'đồng thời', 'ngay lập tức', 'suýt nữa', 'lẽ ra', 'đáng lẽ', 'từ trước', 'xét về', 'về mặt',
    'tức là', 'dẫu sao', 'huống chi', 'huống hồ', 'hầu như', 'trở nên', 'trở thành', 'chính là',
    'hình như', 'có vẻ', 'dần dần', 'nhờ có', 'so với', 'dựa trên', 'miễn là', 'trừ khi', 'trừ phi',
    'ngày càng', 'quả thật', 'nói cách khác', 'ngay khi', 'thay vì', 'chẳng qua'
];

// Transparent phrases learners expect clickable as individual tokens (not glued compounds).
const STOPLIST = new Set([
    'ăn cơm', 'uống nước', 'đi học', 'đi làm', 'về nhà', 'đọc sách', 'xem phim', 'nghe nhạc',
    'của tôi', 'của bạn', 'của anh', 'của chị', 'của em', 'của họ', 'của mình', 'của chúng ta',
    'cho tôi', 'cho bạn', 'với tôi', 'với bạn', 'từ tôi', 'về tôi',
    'làm gì', 'đi đâu', 'ăn gì', 'uống gì', 'nói gì', 'có gì', 'ở đâu', 'khi nào', 'lúc nào',
    'không có', 'đã có', 'sẽ có', 'đang có', 'chưa có', 'vẫn có', 'cũng có',
    'không biết', 'không hiểu', 'không thích', 'không muốn', 'không cần', 'không phải',
    'đã từng', 'sẽ đi', 'đang làm', 'tìm ra', 'làm xong', 'quên mất', 'nói lại', 'nhắc lại'
]);

export function extractVietnameseCompounds(rawText) {
    const compounds = new Set();

    for (const rawLine of rawText.split(/\r?\n/)) {
        if (!rawLine) continue;
        const tabIdx = rawLine.indexOf('\t');
        const entry = (tabIdx === -1 ? rawLine : rawLine.slice(0, tabIdx))
            .normalize('NFC')
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .trim();

        if (!entry.includes(' ')) continue;
        const syllables = entry.split(' ');
        if (syllables.length < 2 || syllables.length > 4) continue;
        if (!syllables.every(s => VALID_SYLLABLE_RE.test(s))) continue;
        if (STOPLIST.has(entry)) continue;

        compounds.add(entry);
    }

    for (const phrase of SUPPLEMENT) {
        const clean = phrase.normalize('NFC').toLowerCase().trim();
        if (!STOPLIST.has(clean)) compounds.add(clean);
    }

    return Array.from(compounds).sort();
}

async function main() {
    console.log(`Fetching MIT ipa-dict Vietnamese lexicon from ${IPA_DICT_VI_URL}...`);
    const res = await fetch(IPA_DICT_VI_URL, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) {
        throw new Error(`HTTP ${res.status} fetching ${IPA_DICT_VI_URL}`);
    }
    const rawText = await res.text();
    const compounds = extractVietnameseCompounds(rawText);

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, compounds.join('\n') + '\n', 'utf8');
    console.log(`Wrote ${compounds.length} Vietnamese compounds to ${OUTPUT_PATH}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    main().catch(err => {
        console.error(err);
        process.exit(1);
    });
}
