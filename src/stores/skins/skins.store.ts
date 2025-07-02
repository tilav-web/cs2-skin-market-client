import { create } from 'zustand';
import type { ISkin } from '@/interfaces/skin.interface';

interface SkinsStore {
  skins: ISkin[];
  loading: boolean;
  setSkins: (skins: ISkin[]) => void;
  setLoading: (loading: boolean) => void;
  clearSkins: () => void;
}

export const useSkinsStore = create<SkinsStore>((set) => ({
  skins: [],
  loading: false,
  setSkins: (skins) => set({ skins }),
  setLoading: (loading) => set({ loading }),
  clearSkins: () => set({ skins: [] }),
}));
