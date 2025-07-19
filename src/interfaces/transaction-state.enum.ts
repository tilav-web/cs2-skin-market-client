export const TransactionState = {
  Paid: 2,
  Pending: 1,
  PendingCanceled: -1,
  PaidCanceled: -2,
} as const;

export type TransactionState = typeof TransactionState[keyof typeof TransactionState];
