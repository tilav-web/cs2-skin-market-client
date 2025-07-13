import { privateInstance } from "@/common/api/client-api";

export const transactionService = {
  getUserTransactions: async () => {
    try {
      const res = await privateInstance.get("/transactions/my");
      return res.data;
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      throw error;
    }
  },
};
