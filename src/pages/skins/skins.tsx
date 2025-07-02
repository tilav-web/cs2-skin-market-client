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

export default function Skins() {
  const [selectedSkin, setSelectedSkin] = useState<ISkin | null>(null);
  const [price, setPrice] = useState(0);
  const [isAdvertisement, setIsAdvertisement] = useState(false);
  const commission = isAdvertisement ? price * 0.07 : price * 0.05;
  const [ownedSkins, setOwnedSkins] = useState<ISkin[]>([]);

  const handleSellClick = (skin: ISkin) => {
    setSelectedSkin(skin);
    setPrice(skin.price);
    setIsAdvertisement(false); // Reset checkbox on new selection
  };

  const handleClose = () => {
    setSelectedSkin(null);
  };

  const handleSell = () => {
    if (isAdvertisement && price <= 19999) {
      toast.error("Reklama uchun narx 19999 dan katta bo'lishi kerak.");
      return;
    }
    // TODO: Implement the actual sell logic with an API call
    console.log(`Selling ${selectedSkin?.name} for ${price}, advertisement: ${isAdvertisement}`);
    handleClose();
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await userService.findMySkins();
        setOwnedSkins(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
      {ownedSkins.length === 0 ? (
        <div className="text-center text-gray-400 py-12 flex flex-col items-center gap-3">
          <div className="text-lg font-semibold">Sizda hozircha skin yo'q yoki inventar yopiq.</div>
          <div className="max-w-xs text-sm text-gray-400">
            Agar skinlaringiz ko'rinmayotgan bo'lsa, Steam inventaringizni <span className="font-semibold text-blue-500">public</span> qilishingiz kerak.
            <br />
            <a
              href="https://steamcommunity.com/my/edit/settings"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Steam inventar sozlamalari
            </a>
            <br />
            {`"Inventory `}{'>'}{` Privacy Settings `}{'>'}{` Public" qilib qo'ying.`}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ownedSkins.map((skin) => (
            <SkinCard
              key={skin.id}
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
                  {selectedSkin.statTrak ? "StatTrak™ " : ""}
                  {selectedSkin.weapon} | {selectedSkin.name} ({selectedSkin.wear})
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex justify-center items-center h-32">
                  <img
                    src={selectedSkin.image}
                    alt={selectedSkin.name}
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
                      onCheckedChange={(checked) => setIsAdvertisement(Boolean(checked))}
                    />
                    <Label htmlFor="advertisement" className="text-sm font-medium">
                      Reklama bo'limiga joylashtirish
                    </Label>
                  </div>
                  {isAdvertisement && (
                    <p className="text-xs text-muted-foreground mt-1.5 ml-1">
                      Skin 1 hafta davomida reklama bo'limida turadi. Komissiya 7% bo'ladi.
                    </p>
                  )}
                  <div className="mt-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Komissiya ({isAdvertisement ? "7%" : "5%"}):</span>
                      <span className="font-medium">{commission.toLocaleString()} tilav</span>
                    </div>
                    <div className="flex justify-between font-bold mt-1">
                      <span>Siz olasiz:</span>
                      <span>{(price - commission).toLocaleString()} tilav</span>
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
