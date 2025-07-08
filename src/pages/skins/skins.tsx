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
import coinSub from "@/assets/coin-sub.png";
import { toast } from "sonner";
import { userService } from "@/services/user.service";
import { useSkinsStore } from "@/stores/skins/skins.store";
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
import { RefreshCw } from "lucide-react"; // Refresh icon

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
  const [isAdvertisement, setIsAdvertisement] = useState(false); // Reklama bo'limi uchun
  const [adHours, setAdHours] = useState(0); // Telegram uchun soat (0 = post qilinmaydi)
  const [fetchError, setFetchError] = useState<string | null>(null);
  // Reklama narxi va komissiya hisoblash
  const telegramPrice = adHours > 0 ? adHours * 1000 : 0;
  const commission = isAdvertisement ? price * 0.07 : price * 0.05;

  const { skins, loading, setSkins, setLoading } = useSkinsStore();
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
      if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
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
    if (skins.length === 0) {
      fetchSkins(false);
    }
  }, [skins.length, fetchSkins]);

  const handleSellClick = (skin: ISkin) => {
    setSelectedSkin(skin);
    setPrice(0); // Yangi interfeysda narx yo'q, default 0
    setIsAdvertisement(false); // Reset reklama bo'limi
    setAdHours(0); // Reset telegram soat
  };

  const handleClose = () => {
    setSelectedSkin(null);
  };

  const handleSell = () => {
    if (adHours > 0 && telegramPrice <= 19999) {
      toast.error("Telegram uchun umumiy narx 19999 dan katta bo'lishi kerak.");
      return;
    }
    // TODO: Implement the actual sell logic with an API call
    console.log(
      `Selling ${selectedSkin?.market_hash_name} for ${price} tilav, reklama: ${isAdvertisement}, komissiya: ${commission}, telegram: ${adHours} soat (${telegramPrice} tilav)`
    );
    handleClose();
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center mb-4"> {/* Added relative for positioning */}
        <img src={coinSub} alt="Tilav Coin" className="w-24 h-24" />
        <p className="font-bold text-xl mt-2">Tilav coin</p>
        <p className="text-center text-sm text-gray-500 px-4">
          Bu yerda siz o'z skinlaringizni sotishingiz mumkin. Barcha savdolar
          "tilav coin"da amalga oshiriladi. <strong>1 so'm = 1 tilav.</strong>
        </p>
        {/* Refresh Button */}
        <div className="absolute top-0 right-0 mt-2 mr-2"> {/* Positioned top-right */}
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
                    ? `Qayta yangilash uchun ${formatTime(remainingCooldown)} kuting.`
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
              variant="sell"
              onSellClick={handleSellClick}
            />
          ))}
        </div>
      )}

      <Drawer open={!!selectedSkin} onClose={handleClose}>
        <DrawerContent>
          {selectedSkin && (
            <>
              <DrawerHeader className="text-left">
                <DrawerTitle>Skini sotish</DrawerTitle>
                <DrawerDescription>
                  {selectedSkin.market_hash_name}
                  <br />
                  <span
                    className={
                      selectedSkin.tradable ? "text-green-600" : "text-red-600"
                    }
                  >
                    {selectedSkin.tradable ? "Tradable" : "Not Tradable"}
                  </span>
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex justify-center items-center h-32">
                  <img
                    src={selectedSkin.icon_url}
                    alt={selectedSkin.market_hash_name}
                    className="max-w-full max-h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="price" className="text-sm font-medium">
                    Narx (tilav)
                  </label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="mt-1"
                  />
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id="advertisement"
                      checked={isAdvertisement}
                      onCheckedChange={(checked) =>
                        setIsAdvertisement(Boolean(checked))
                      }
                    />
                    <Label
                      htmlFor="advertisement"
                      className="text-sm font-medium"
                    >
                      Reklama bo'limiga joylashtirish (komissiya 7%)
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-sm">
                      Telegram kanal topida:
                    </span>
                    <Select
                      value={String(adHours)}
                      onValueChange={(v) => setAdHours(Number(v))}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Soat tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 25 }, (_, i) => (
                          <SelectItem key={i} value={String(i)}>
                            {i} soat
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="px-2 py-0.5 text-xs bg-slate-100 text-slate-700 mt-1 border border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
                    Telegram kanalda topda ushlab turish. Soatiga 1000 tilav olinadi.
                  </div>
                  <div className="mt-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Komissiya ({isAdvertisement ? "7%" : "5%"}):
                      </span>
                      <span className="font-medium">
                        {commission.toLocaleString()} tilav
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-500">
                        Telegram reklama narxi:
                      </span>
                      <span className="font-medium">
                        {telegramPrice.toLocaleString()} tilav
                      </span>
                    </div>
                    <div className="flex justify-between font-bold mt-1">
                      <span>Siz olasiz:</span>
                      <span>{(price - commission).toLocaleString()} tilav</span>
                    </div>
                  </div>
                </div>
              </div>
              <DrawerFooter className="bg-muted/10 border-t p-4">
                <Button onClick={handleSell} className="text-white font-bold">
                  Sotish
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" onClick={handleClose}>
                    Bekor qilish
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
