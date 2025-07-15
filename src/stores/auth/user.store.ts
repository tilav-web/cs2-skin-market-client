import type { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";
import { userService } from "@/services/user.service"; // userService ni import qilamiz

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  fetchUser: () => Promise<void>; // Yangi funksiya
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const userData = await userService.findMe(); // Serverdan foydalanuvchi ma'lumotlarini olamiz
      set({ user: userData });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      set({ user: null }); // Xato bo'lsa user ni null qilamiz
    }
  },
}));

// Ilova boshlanganda foydalanuvchi ma'lumotlarini yuklash
// Bu qismni ilovaning asosiy kirish nuqtasida (masalan, App.tsx yoki main.tsx) chaqirish maqsadga muvofiq.
// Lekin hozircha, oddiylik uchun shu yerda chaqiramiz.
// useUserStore.getState().fetchUser(); // Bu qatorni App.tsx ichida useEffect bilan chaqirish yaxshiroq