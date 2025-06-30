import { useState } from "react";
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

// Temporary data, will be replaced with API call
const ownedSkins: ISkin[] = [
  {
    id: 1,
    weapon: "AK-47",
    name: "Redline",
    price: 1550,
    image:
      "https://cdn.csgoskins.gg/public/uih/weapons/aHR0cHM6Ly9jZG4uY3Nnb3NraW5zLmdnL3B1YmxpYy9pbWFnZXMvYnVja2V0cy9lY29uL3dlYXBvbnMvYmFzZV93ZWFwb25zL3dlYXBvbl9hazQ3LmQwMGQxZGZhMDk2MjFjMjk3Njk2ZTM1M2Y0MTMzMzBjOTRlZDUwOTAucG5n/auto/auto/85/notrim/06be7f9eb59aeebc19509c82a43a82b5.webp",
    rarity: "Classified",
    wear: "Field-Tested",
    statTrak: false,
  },
  {
    id: 2,
    weapon: "AWP",
    name: "Asiimov",
    price: 7500,
    image:
      "https://cdn.csgoskins.gg/public/uih/weapons/aHR0cHM6Ly9jZG4uY3Nnb3NraW5zLmdnL3B1YmxpYy9pbWFnZXMvYnVja2V0cy9lY29uL3dlYXBvbnMvYmFzZV93ZWFwb25zL3dlYXBvbl9hazQ3LmQwMGQxZGZhMDk2MjFjMjk3Njk2ZTM1M2Y0MTMzMzBjOTRlZDUwOTAucG5n/auto/auto/85/notrim/06be7f9eb59aeebc19509c82a43a82b5.webp",
    rarity: "Covert",
    wear: "Battle-Scarred",
    statTrak: false,
  },
];

export default function Skins() {
  const [selectedSkin, setSelectedSkin] = useState<ISkin | null>(null);
  const [price, setPrice] = useState(0);
  const commission = price * 0.05;

  const handleSellClick = (skin: ISkin) => {
    setSelectedSkin(skin);
    setPrice(skin.price);
  };

  const handleClose = () => {
    setSelectedSkin(null);
  };

  const handleSell = () => {
    // TODO: Implement the actual sell logic with an API call
    console.log(`Selling ${selectedSkin?.name} for ${price}`);
    handleClose();
  }

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
      <div className="grid grid-cols-2 gap-2">
        {ownedSkins.map((skin) => (
          <SkinCard
            key={skin.id}
            skin={skin}
            variant="sell"
            onSellClick={handleSellClick}
          />
        ))}
      </div>

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
              <div className="p-4">
                <div className="flex justify-center items-center h-32">
                  <img
                    src={selectedSkin.image}
                    alt={selectedSkin.name}
                    className="max-w-full max-h-full object-contain"
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
                  <div className="mt-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Komissiya (5%):</span>
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
