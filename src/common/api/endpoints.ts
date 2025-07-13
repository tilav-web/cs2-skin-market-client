export const endpoints = {
    USERS: '/users',
    SKINS: '/skins',
    TRANSACTIONS: '/transactions',
    CLICK: '/click',
    CANCEL_SALE: (skinId: string) => `/skins/${skinId}/cancel-sale`,
};