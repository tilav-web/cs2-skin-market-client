import { privateInstance } from '../common/api/client-api';
import { endpoints } from '../common/api/endpoints';

class SkinService {
  async getAdvertisingPendingSkins(page = 1, limit = 20) {
    const res = await privateInstance.get(`${endpoints.SKINS}/advertising-pending`, {
      params: { page, limit },
    });
    return res.data;
  }
}

export const skinService = new SkinService()