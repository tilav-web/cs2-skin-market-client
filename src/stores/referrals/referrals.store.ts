import { create } from 'zustand';
import { toast } from 'sonner';
import { privateInstance } from '@/common/api/client-api';

interface ReferredUser {
  id: string;
  personaname: string;
  photo: string;
  joinDate: string;
}

interface ReferralsState {
  referredUsers: ReferredUser[];
  isLoading: boolean;
  error: string | null;
  fetchReferrals: () => Promise<void>;
}

export const useReferralsStore = create<ReferralsState>((set, get) => ({
  referredUsers: [],
  isLoading: false,
  error: null,
  fetchReferrals: async () => {
    if (get().referredUsers.length > 0 && !get().isLoading) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await privateInstance.get('/referrals/my');
      set({ referredUsers: response.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch referrals:", error);
      set({ error: "Referallarni yuklashda xatolik yuz berdi.", isLoading: false });
      toast.error("Referallarni yuklashda xatolik yuz berdi.");
    }
  },
}));
