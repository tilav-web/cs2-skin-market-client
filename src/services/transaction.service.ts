import { privateInstance } from "@/common/api/client-api";
import { endpoints } from "@/common/api/endpoints";

export const transactionService = {
  getUserTransactions: async (limit?: number) => {
    try {
      const res = await privateInstance.get(endpoints.TRANSACTIONS + "/my", {
        params: { limit },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      throw error;
    }
  },

  initiateClickDeposit: async (amount: number) => {
    try {
      const res = await privateInstance.post(endpoints.CLICK.INITIATE_DEPOSIT, { amount });
      return res.data; // Bu yerda Click.uz ga yo'naltirish URL'i kelishi kerak
    } catch (error) {
      console.error("Error initiating Click.uz deposit:", error);
      throw error;
    }
  },

  buySkin: async (skinId: string) => {
    try {
      const res = await privateInstance.post(endpoints.TRANSACTIONS + `/buy/${skinId}`);
      return res.data;
    } catch (error) {
      console.error("Error buying skin:", error);
      throw error;
    }
  },
};