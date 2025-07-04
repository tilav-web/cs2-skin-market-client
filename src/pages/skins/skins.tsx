import { useEffect, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { userService } from "@/services/user.service";
import { useSkinsStore } from '@/stores/skins/skins.store';

export default function Skins() {
  const [selectedSkin, setSelectedSkin] = useState<ISkin | null>(null);
  const [price, setPrice] = useState(0);
  const [isAdvertisement, setIsAdvertisement] = useState(false);
  const [adHours, setAdHours] = useState(1); // Reklama uchun soat
  const [fetchError, setFetchError] = useState<string | null>(null);
  // Reklama narxi va komissiya hisoblash
  const adPrice = isAdvertisement ? adHours * 1000 : 0;
  const commission = isAdvertisement ? adPrice * 0.07 : price * 0.05;

  const { skins, loading, setSkins, setLoading } = useSkinsStore();

  const handleSellClick = (skin: ISkin) => {
    setSelectedSkin(skin);
    setPrice(0); // Yangi interfeysda narx yo'q, default 0
    setIsAdvertisement(false); // Reset checkbox on new selection
    setAdHours(1); // Reset ad hours
  };

  const handleClose = () => {
    setSelectedSkin(null);
  };

  const handleSell = () => {
    if (isAdvertisement && adHours < 1) {
      toast.error("Soat soni kamida 1 bo'lishi kerak.");
      return;
    }
    if (isAdvertisement && adPrice <= 19999) {
      toast.error("Reklama uchun umumiy narx 19999 dan katta bo'lishi kerak.");
      return;
    }
    // TODO: Implement the actual sell logic with an API call
    if (isAdvertisement) {
      console.log(`Selling ${selectedSkin?.market_hash_name} for ${adPrice} tilav (ad for ${adHours} hours), commission: ${commission}`);
    } else {
      console.log(`Selling ${selectedSkin?.market_hash_name} for ${price}, commission: ${commission}`);
    }
    handleClose();
  };

  useEffect(() => {
    if (skins.length > 0) return;
    setLoading(true);
    setFetchError(null);
    (async () => {
      try {
        const data = await userService.findMySkins();
        setSkins(data);
      } catch (error: unknown) {
        setFetchError("Hozircha skinlarni olish imkoni yo'q. Bu ko'pincha Steam API so'rovlar ko'pligi sababli vaqtincha cheklov qo'yilgani uchun yuz beradi. Iltimos, birozdan so'ng qayta urinib ko'ring.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [setSkins, setLoading, skins.length]);

  return (
    <div>
      <div className="flex flex-col items-center mb-4">
        <img src={coinSub} alt="Tilav Coin" className="w-24 h-24" />
        <p className="font-bold text-xl mt-2">Tilav coin</p>
        <p className="text-center text-sm text-gray-500 px-4">
          Bu yerda siz o'z skinlaringizni sotishingiz mumkin. Barcha
          savdolar "tilav coin"da amalga oshiriladi. <strong>1 so'm = 1 tilav.</strong>
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-12 text-gray-400">
          Skinlar yuklanmoqda...
        </div>
      ) : fetchError ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="flex items-center gap-2 bg-yellow-100 border border-yellow-300 rounded-lg px-6 py-4 shadow-sm">
            <span className="text-2xl">⚠️</span>
            <span className="text-yellow-800 text-base font-medium">{fetchError}</span>
          </div>
        </div>
      ) : skins.length === 0 ? (
        <div className="text-center text-gray-400 py-12 flex flex-col items-center gap-3">
          <div className="text-lg font-semibold">Sizda hozircha skin yo'q yoki inventar yopiq.</div>
          <div className="max-w-xs text-sm text-gray-400">
            Agar skinlaringiz ko'rinmayotgan bo'lsa, Steam inventaringizni <span className="font-semibold text-blue-500 underline cursor-pointer">
              <a
                href="https://steamcommunity.com/my/edit/settings"
                target="_blank"
                rel="noopener noreferrer"
              >
                public
              </a>
            </span> qilishingiz kerak.
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
                  <span className={selectedSkin.tradable ? "text-green-600" : "text-red-600"}>
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
                    {isAdvertisement ? 'Reklama narxi (tilav)' : 'Narx (tilav)'}
                  </label>
                  {isAdvertisement ? (
                    <div className="space-y-2 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Soat soni:</span>
                        <Input
                          id="adHours"
                          type="number"
                          min={1}
                          value={adHours}
                          onChange={e => setAdHours(Math.max(1, Number(e.target.value)))}
                          className="w-20"
                        />
                        <span className="text-xs text-gray-500">(1 soat = 1000 tilav)</span>
                      </div>
                      <div className="text-xs text-blue-600 bg-blue-50 rounded px-2 py-1">
                        Telegram kanalimizda skiningiz <b>topda</b> ko'rsatiladi. Har 1 soat uchun 1000 tilav olinadi. Minimal narx 19999 tilav. <br />
                        Masalan: 5 soat = 5000 tilav.
                      </div>
                    </div>
                  ) : (
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="mt-1"
                    />
                  )}
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id="advertisement"
                      checked={isAdvertisement}
                      onCheckedChange={(checked) => setIsAdvertisement(Boolean(checked))}
                    />
                    <Label htmlFor="advertisement" className="text-sm font-medium">
                      Reklama bo'limiga joylashtirish (Telegram kanal topida)
                    </Label>
                  </div>
                  {isAdvertisement && (
                    <p className="text-xs text-muted-foreground mt-1.5 ml-1">
                      Skin {adHours} soat davomida reklama bo'limida va Telegram kanalimiz topida turadi. Komissiya 7% bo'ladi.
                    </p>
                  )}
                  <div className="mt-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Komissiya ({isAdvertisement ? "7%" : "5%"}):</span>
                      <span className="font-medium">{(isAdvertisement ? commission : commission).toLocaleString()} tilav</span>
                    </div>
                    <div className="flex justify-between font-bold mt-1">
                      <span>Siz olasiz:</span>
                      <span>{(isAdvertisement ? adPrice - commission : price - commission).toLocaleString()} tilav</span>
                    </div>
                  </div>
                </div>
              </div>
              <DrawerFooter className="bg-muted/10 border-t p-4">
                <Button onClick={handleSell} className="text-white font-bold">Sotish</Button>
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
