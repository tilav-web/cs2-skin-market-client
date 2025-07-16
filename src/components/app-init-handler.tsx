import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/auth/user.store";

export function AppInitHandler() {
  const navigate = useNavigate();
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.requestFullscreen();
      window.Telegram.WebApp.lockOrientation();

      const startParam = window.Telegram.WebApp.initDataUnsafe.start_param;
      if (startParam && startParam.startsWith("skins_buy_")) {
        const skinId = startParam.replace("skins_buy_", "");
        navigate(`/skins/buy/${skinId}`);
      }
      if (startParam && startParam === "profile") {
        navigate("/profile");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return null;
}
