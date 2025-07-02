import { privateInstance } from "@/common/api/client-api";
import { endpoints } from "@/common/api/endpoints";

class UserService {
  async findMe() {
    try {
      const res = await privateInstance.get(`${endpoints.USERS}/find/me`);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const userService = new UserService();
