import { clientApi } from '@/common/api/client-api';
import type { ITransaction } from '@/interfaces/transaction.interface';

export const transactionService = {
  getUserTransactions: async (): Promise<ITransaction[]> => {
    try {
      const transactions = await clientApi.getUserTransactions();
      return transactions;
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      throw error;
    }
  },
};
