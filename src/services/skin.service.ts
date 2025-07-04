import { privateInstance } from '../common/api/client-api';
import { endpoints } from '../common/api/endpoints';

class SkinService {
  async getAdvertisingPendingSkins() {
    const res = await privateInstance.get(`${endpoints.SKINS}/advertising-pending`);
    return res.data;
  }
}

export const skinService = new SkinService()