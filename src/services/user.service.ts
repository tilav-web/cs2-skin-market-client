import { privateInstance } from "@/common/api/client-api";
import { endpoints } from "@/common/api/endpoints";
import axios from "axios";

interface SteamAsset {
  assetid: string;
  classid: string;
  instanceid: string;
}

interface SteamDescription {
  classid: string;
  instanceid: string;
  market_hash_name?: string;
  market_name?: string;
  name?: string;
  icon_url?: string;
  tradable?: number;
}

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

  async findMySkins(steam_id: string) {
    try {
      const url = `https://steamcommunity.com/inventory/${steam_id}/730/2`;
      const res = await axios.get(url);

      if (!res.data || !res.data.assets || !res.data.descriptions) {
        throw new Error(
          "Inventar yopiq yoki ma'lumot topilmadi"
        );
      }

      const items = res.data.assets.map((asset: SteamAsset) => {
        const description = res.data.descriptions.find(
          (desc: SteamDescription) =>
            desc.classid === asset.classid &&
            desc.instanceid === asset.instanceid
        );

        return {
          assetid: asset.assetid,
          classid: asset.classid,
          instanceid: asset.instanceid,
          market_hash_name:
            description?.market_hash_name ||
            description?.market_name ||
            description?.name ||
            "",
          icon_url: description?.icon_url
            ? `https://steamcommunity-a.akamaihd.net/economy/image/${description.icon_url}`
            : "",
          tradable: description?.tradable === 1, // <-- to'g'ri joy shu
        };
      });

      return items;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const userService = new UserService();
