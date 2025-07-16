export const endpoints = {
    USERS: '/users',
    SKINS: '/skins',
    TRANSACTIONS: '/transactions',
    CLICK: {
        BASE: '/click',
        INITIATE_DEPOSIT: '/click/initiate-deposit', // Yangi endpoint
    },
    REFERRALS: '/referrals',
    CANCEL_SALE: (skinId: string) => `/skins/${skinId}/cancel-sale`,
};