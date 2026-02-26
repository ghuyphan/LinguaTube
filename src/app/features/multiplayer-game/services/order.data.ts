export interface OrderItem {
    id: string;
    name: string;
    items: string[];
    hints: Record<string, string>; // e.g. { 'en': '...', 'ja': '...' }
}

export const GAME_ORDERS: OrderItem[] = [
    {
        id: 'o_1',
        name: 'Iced Matcha Latte',
        items: ['cup', 'matcha', 'milk_oat', 'ice'],
        hints: {
            'en': 'I would like to order an Iced Matcha Latte with Oat milk.',
            'ja': 'オーツミルクのアイス抹茶ラテをお願いします。',
            'ko': '오트밀크가 들어간 아이스 말차 라떼 하나 주세요.',
            'zh': '请给我来一杯燕麦奶冰抹茶拿铁。',
            'vi': 'Cho tôi một ly Matcha Latte đá với sữa yến mạch.'
        }
    },
    {
        id: 'o_2',
        name: 'Hot Vanilla Latte',
        items: ['cup', 'espresso', 'milk_whole', 'syrup_vanilla'],
        hints: {
            'en': 'Can I get a hot vanilla latte?',
            'ja': 'ホットのバニララテを一つもらえますか？',
            'ko': '따뜻한 바닐라 라떼 하나 주시겠어요?',
            'zh': '我可以点一杯热香草拿铁吗？',
            'vi': 'Cho tôi một ly Latte Vanilla nóng nhé.'
        }
    },
    {
        id: 'o_3',
        name: 'Iced Americano',
        items: ['cup', 'espresso', 'ice'],
        hints: {
            'en': 'I need an iced americano, please.',
            'ja': 'アイスアメリカーノをお願いします。',
            'ko': '아이스 아메리카노 주세요.',
            'zh': '请给我一杯冰美式咖啡。',
            'vi': 'Cho tôi một ly Americano đá.'
        }
    },
    {
        id: 'o_4',
        name: 'Hot Oat Milk Matcha',
        items: ['cup', 'matcha', 'milk_oat'],
        hints: {
            'en': 'A hot matcha latte with oat milk, please.',
            'ja': 'ホットのオーツミルク抹茶ラテをお願いします。',
            'ko': '따뜻한 오트밀크 말차 라떼 주세요.',
            'zh': '请给我一杯热的燕麦奶抹茶拿铁。',
            'vi': 'Cho một Matcha nóng với sữa yến mạch.'
        }
    },
    {
        id: 'o_5',
        name: 'Vanilla Iced Coffee',
        items: ['cup', 'espresso', 'ice', 'syrup_vanilla'],
        hints: {
            'en': 'I want an iced coffee with vanilla syrup.',
            'ja': 'バニラシロップ入りのアイスコーヒーが欲しいです。',
            'ko': '바닐라 시럽을 넣은 아이스 커피 원해요.',
            'zh': '我想要一杯加香草糖浆的冰咖啡。',
            'vi': 'Tôi muốn một ly cà phê đá với si-rô vanilla.'
        }
    }
];

export function getRandomOrder(): OrderItem {
    return GAME_ORDERS[Math.floor(Math.random() * GAME_ORDERS.length)];
}
