import { create } from 'zustand';
import type { ISkin } from '@/interfaces/skin.interface';

interface AdvertisedSkinsStore {
  skins: ISkin[];
  loading: boolean;
  page: number;
  totalPages: number;
  hasMore: boolean;
  setSkins: (skins: ISkin[], totalPages: number) => void;
  addSkins: (skins: ISkin[], totalPages: number) => void;
  setLoading: (loading: boolean) => void;
  setPage: (page: number) => void;
  reset: () => void;
  removeAdvertisedSkin: (skinId: string) => void;
  updateAdvertisedSkin: (skinId: string, updatedData: Partial<ISkin>) => void;
}

export const useAdvertisedSkinsStore = create<AdvertisedSkinsStore>((set) => ({
  skins: [],
  loading: false,
  page: 1,
  totalPages: 1,
  hasMore: true,
  setSkins: (skins, totalPages) => set({ skins, totalPages, hasMore: skins.length > 0 && 1 < totalPages }),
  addSkins: (newSkins, totalPages) =>
    set((state) => ({
      skins: [...state.skins, ...newSkins],
      totalPages,
      hasMore: state.page < totalPages,
    })),
  setLoading: (loading) => set({ loading }),
  setPage: (page) => set({ page }),
  reset: () => set({ skins: [], loading: false, page: 1, totalPages: 1, hasMore: true }),
  removeAdvertisedSkin: (skinId) =>
    set((state) => ({
      skins: state.skins.filter((skin) => skin._id !== skinId),
    })),
  updateAdvertisedSkin: (skinId, updatedData) =>
    set((state) => ({
      skins: state.skins.map((skin) =>
        skin._id === skinId ? { ...skin, ...updatedData } : skin
      ),
    })),
}));
