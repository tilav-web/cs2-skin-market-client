import { privateInstance } from "@/common/api/client-api";

export const transactionService = {
  getUserTransactions: async () => {
    try {
      const transactions = await privateInstance.get("/transactions/my");
      return transactions;
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      throw error;
    }
  },
};
