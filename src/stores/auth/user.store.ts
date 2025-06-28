import type { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";

interface UserState {
  user: IUser | null;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
}));
