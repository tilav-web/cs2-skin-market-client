export const endpoints = {
    USERS: '/users',
    SKINS: '/skins',
    TRANSACTIONS: '/transactions',
    GET_MY_TRANSACTIONS: '/transactions/my',
    CLICK: {
        BASE: '/click',
        INITIATE_DEPOSIT: '/click/initiate-deposit', // Yangi endpoint
    },
    REFERRALS: '/referrals',
    CANCEL_SALE: (skinId: string) => `/skins/${skinId}/cancel-sale`,
    UPDATE_TRADE_URL: '/users/trade-url',
};