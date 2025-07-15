import { useEffect, useState, useCallback, useRef } from "react";
import { SkinCard } from "@/components/common/skin-card";
import type { ISkin } from "@/interfaces/skin.interface";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import coinSub from "@/assets/coin-sub.png";
import { toast } from "sonner";
import { userService } from "@/services/user.service";
import { skinService } from "@/services/skin.service";
import { useSkinsStore } from "@/stores/skins/skins.store";
import { useAdvertisedSkinsStore } from "@/stores/advertised-skins/advertised-skins.store";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefreshCw } from "lucide-react";
import { useUserStore } from "@/stores/auth/user.store";
import { Link } from "react-router-dom";

// Cooldown constants
const LAST_REFRESH_TIMESTAMP_KEY = "skins_last_refresh";
const COOLDOWN_DURATION_MS = 60 * 60 * 1000; // 1 soat millisekundlarda

function formatTime(ms: number) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0
    ? `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`
    : `${seconds}s`;
}

export default function Skins() {
  const [selectedSkin, setSelectedSkin] = useState<ISkin | null>(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [isAdvertisement, setIsAdvertisement] = useState(false);
  const [adHours, setAdHours] = useState(0);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasFetchedInitialSkins, setHasFetchedInitialSkins] = useState(false);

  const telegramPrice = adHours > 0 ? adHours * 1000 : 0;
  const commission = isAdvertisement ? price * 0.07 : price * 0.05;

  const { skins, loading, setSkins, setLoading, updateSkin } = useSkinsStore();
  const { updateAdvertisedSkin } = useAdvertisedSkinsStore();
  const { user } = useUserStore();

  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [remainingCooldown, setRemainingCooldown] = useState(0);
  const cooldownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkCooldown = useCallback(() => {
    const last = localStorage.getItem(LAST_REFRESH_TIMESTAMP_KEY);
    if (last) {
      const lastTime = parseInt(last, 10);
      const now = Date.now();
      const diff = now - lastTime;
      if (diff < COOLDOWN_DURATION_MS) {
        setIsCooldownActive(true);
        setRemainingCooldown(COOLDOWN_DURATION_MS - diff);
        return true;
      }
    }
    setIsCooldownActive(false);
    setRemainingCooldown(0);
    return false;
  }, []);

  useEffect(() => {
    checkCooldown();
    if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
    cooldownIntervalRef.current = setInterval(() => {
      checkCooldown();
    }, 1000);
    return () => {
      if (cooldownIntervalRef.current)
        clearInterval(cooldownIntervalRef.current);
    };
  }, [checkCooldown]);

  const fetchSkins = useCallback(
    async (refresh: boolean = false) => {
      if (refresh && checkCooldown()) {
        toast.error(
          `Skinlarni yangilash uchun ${formatTime(remainingCooldown)} kuting.`
        );
        return;
      }
      if (refresh) {
        localStorage.setItem(LAST_REFRESH_TIMESTAMP_KEY, Date.now().toString());
        checkCooldown();
      }
      setLoading(true);
      setFetchError(null);
      try {
        const data = await userService.findMySkins(refresh);
        setSkins(data);
        setHasFetchedInitialSkins(true);
      } catch (error: unknown) {
        setFetchError(
          "Hozircha skinlarni olish imkoni yo'q. Bu ko'pincha Steam API so'rovlar ko'pligi sababli vaqtincha cheklov qo'yilgani uchun yuz beradi. Iltimos, birozdan so'ng qayta urinib ko'ring."
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [setSkins, setLoading, setFetchError, checkCooldown, remainingCooldown]
  );

  useEffect(() => {
    if (!hasFetchedInitialSkins && skins.length === 0) {
      fetchSkins(false);
    }
  }, [skins.length, fetchSkins, hasFetchedInitialSkins]);

  const handleSellClick = (skin: ISkin) => {
    setSelectedSkin(skin);
    setPrice(0);
    setDescription("");
    setIsAdvertisement(false);
    setAdHours(0);
  };

  const handleClose = () => {
    setSelectedSkin(null);
  };

  const handleSell = async () => {
    if (!selectedSkin) return;
    if (price < 0) {
      toast.error("Narx 0 dan katta boʻlishi kerak.");
      return;
    }

    setIsSubmitting(true);
    try {
      const skinData = {
        price,
        description: price === 0 ? description : undefined,
        advertising: isAdvertisement,
        advertising_hours: adHours,
      };

      const updatedSkin = await skinService.listSkinForSale(selectedSkin._id, skinData);
      updateSkin(selectedSkin._id, updatedSkin);
      updateAdvertisedSkin(updatedSkin._id, updatedSkin);
      toast.success(`${selectedSkin.market_hash_name} sotuvga qo'yildi!`);
      handleClose();
    } catch (error) {
      const errorMessage = "Xatolik yuz berdi";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || !user.steam_id) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Ro'yxatdan o'tish kerak</h2>
        <p className="text-gray-600 mb-6">
          Skinlaringizni ko'rish va sotish uchun Steam hisobingizni ulashingiz kerak.
        </p>
        <Link to="/auth">
          <Button>Ro'yxatdan o'tish</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex flex-col items-center mb-4">
        {" "}
        <img src={coinSub} alt="Tilav Coin" className="w-24 h-24" />
        <p className="font-bold text-xl mt-2">Tilav coin</p>
        <p className="text-center text-sm text-gray-500 px-4">
          Bu yerda siz o'z skinlaringizni sotishingiz mumkin. Barcha savdolar
          "tilav coin"da amalga oshiriladi. <strong>1 so'm = 1 tilav.</strong>
        </p>
        <div className="absolute top-0 right-0 mt-2 mr-2">
          {" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fetchSkins(true)}
                  disabled={loading || isCooldownActive}
                >
                  <RefreshCw className={loading ? "animate-spin" : ""} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isCooldownActive
                    ? `Qayta yangilash uchun ${formatTime(
                        remainingCooldown
                      )} kuting.`
                    : "Skinlarni yangilash"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-12 text-gray-400">
          Skinlar yuklanmoqda...
        </div>
      ) : fetchError ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="flex items-center gap-2 bg-yellow-100 border border-yellow-300 rounded-lg px-6 py-4 shadow-sm">
            <span className="text-2xl">⚠️</span>
            <span className="text-yellow-800 text-base font-medium">
              {fetchError}
            </span>
          </div>
        </div>
      ) : skins.length === 0 ? (
        <div className="text-center text-gray-400 py-12 flex flex-col items-center gap-3">
          <div className="text-lg font-semibold">
            Sizda hozircha skin yo'q yoki inventar yopiq.
          </div>
          <div className="max-w-xs text-sm text-gray-400">
            Agar skinlaringiz ko'rinmayotgan bo'lsa, Steam inventaringizni{" "}
            <span className="font-semibold text-blue-500 underline cursor-pointer">
              <a
                href="https://steamcommunity.com/my/edit/settings"
                target="_blank"
                rel="noopener noreferrer"
              >
                public
              </a>
            </span>{" "}
            qilishingiz kerak.
            <br />
            {`"Inventory > Privacy Settings > Public" qilib qo'ying.`}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skins.map((skin) => (
            <SkinCard
              key={skin.assetid}
              skin={skin}
              onSellClick={handleSellClick} // variant propini olib tashladik
            />
          ))}
        }
      </div>
    </div>
  );
}