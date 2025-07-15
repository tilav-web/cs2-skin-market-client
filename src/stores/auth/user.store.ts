import type { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";
import { userService } from "@/services/user.service";

interface UserState {
  user: IUser | null | undefined; // undefined: yuklanmoqda, null: yuklanmadi/topilmadi, IUser: yuklandi
  setUser: (user: IUser | null) => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined, // Boshlang'ich qiymat undefined
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const userData = await userService.findMe();
      set({ user: userData });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      set({ user: null }); // Xato bo'lsa null qilamiz
    }
  },
}));
