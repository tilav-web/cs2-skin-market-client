import { privateInstance } from '../common/api/client-api';
import { endpoints } from '../common/api/endpoints';
import type { ISkin } from '@/interfaces/skin.interface';

// Serverdagi CreateSkinDto ga mos keladigan tip
type CreateSkinPayload = Omit<ISkin, 'user' | '_id'> & {
  description?: string;
  advertising?: boolean;
  advertising_hours?: number;
};

class SkinService {
  async create(skinData: CreateSkinPayload) {
    const res = await privateInstance.post(endpoints.SKINS, skinData);
    return res.data;
  }

  async getAdvertisingPendingSkins(page = 1, limit = 20) {
    const res = await privateInstance.get(`${endpoints.SKINS}/advertising-pending`, {
      params: { page, limit },
    });
    return res.data;
  }

  async getAdvertisedSkins(page: number = 1, limit: number = 20) {
    const res = await privateInstance.get(`${endpoints.SKINS}/advertised`, {
      params: { page, limit },
    });
    return res.data;
  }

  async getSkinById(id: string) {
    const res = await privateInstance.get(`${endpoints.SKINS}/public/${id}`);
    return res.data;
  }
}

export const skinService = new SkinService();