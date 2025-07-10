import { create } from 'zustand';
import type { ISkin } from '@/interfaces/skin.interface';

interface SkinsStore {
  skins: ISkin[];
  loading: boolean;
  setSkins: (skins: ISkin[]) => void;
  setLoading: (loading: boolean) => void;
  removeSkin: (assetid: string) => void;
  clearSkins: () => void;
}

export const useSkinsStore = create<SkinsStore>((set) => ({
  skins: [],
  loading: false,
  setSkins: (skins) => set({ skins }),
  setLoading: (loading) => set({ loading }),
  removeSkin: (assetid) =>
    set((state) => ({
      skins: state.skins.filter((skin) => skin.assetid !== assetid),
    })),
  clearSkins: () => set({ skins: [] }),
}));
