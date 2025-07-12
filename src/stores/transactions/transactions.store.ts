import { create } from 'zustand';
import type { ITransaction } from '@/interfaces/transaction.interface';

interface TransactionsState {
  transactions: ITransaction[];
  setTransactions: (transactions: ITransaction[]) => void;
  addTransaction: (transaction: ITransaction) => void;
}

export const useTransactionsStore = create<TransactionsState>((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
}));
