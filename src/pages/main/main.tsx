import { SkinCard } from "@/components/common/skin-card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Remove unused
import type { ISkin } from "@/interfaces/skin.interface";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/auth/user.store";
import coinMain from "@/assets/coin-main.png";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


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
];

const soldSkins: ISkin[] = [
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

const boughtSkins: ISkin[] = [
  {
    id: 3,
    weapon: "StatTrak™ M4A4",
    name: "Howl",
    price: 350000,
    image:
      "https://cdn.csgoskins.gg/public/uih/weapons/aHR0cHM6Ly9jZG4uY3Nnb3NraW5zLmdnL3B1YmxpYy9pbWFnZXMvYnVja2V0cy9lY29uL3dlYXBvbnMvYmFzZV93ZWFwb25zL3dlYXBvbl9hazQ3LmQwMGQxZGZhMDk2MjFjMjk3Njk2ZTM1M2Y0MTMzMzBjOTRlZDUwOTAucG5n/auto/auto/85/notrim/06be7f9eb59aeebc19509c82a43a82b5.webp",
    rarity: "Contraband",
    wear: "Factory New",
    statTrak: true,
  },
  {
    id: 4,
    weapon: "Glock-18",
    name: "Fade",
    price: 1200000000,
    image:
      "https://cdn.csgoskins.gg/public/uih/weapons/aHR0cHM6Ly9jZG4uY3Nnb3NraW5zLmdnL3B1YmxpYy9pbWFnZXMvYnVja2V0cy9lY29uL3dlYXBvbnMvYmFzZV93ZWFwb25zL3dlYXBvbl9hazQ3LmQwMGQxZGZhMDk2MjFjMjk3Njk2ZTM1M2Y0MTMzMzBjOTRlZDUwOTAucG5n/auto/auto/85/notrim/06be7f9eb59aeebc19509c82a43a82b5.webp",
    rarity: "Mil-Spec",
    wear: "Minimal Wear",
    statTrak: false,
  },
];

export default function MainPage() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="pt-12">
      {/* Coin image center */}
      <div className="flex flex-col items-center mb-2">
        <img src={coinMain} alt="Tilav Coin" className="w-26 h-26" />
        <p className="font-bold text-xl">Tilav coin</p>
        <p className="text-center text-sm text-gray-500">Tilav coin yordamida skin-lar sotib oling. 1 so'm = 1 tilav</p>
      </div>
      {/* Balance card */}
      <div className="flex justify-center mb-6">
        <Card className="flex flex-col items-center gap-2 p-6 w-full max-w-xs">
          <span className="text-gray-500 text-sm">Sizning balansingiz</span>
          <span className="font-bold text-2xl flex items-center gap-2">
            <img src={coinMain} alt="Tilav Coin" className="w-6 h-6" />
            {user?.balance ?? 0}
          </span>
          <Button className="mt-2 w-full">Hisobni to'ldirish</Button>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[...ownedSkins, ...soldSkins, ...boughtSkins].map((skin) => (
          <div key={skin.id} className="relative">
            <Badge className="absolute left-2 top-2 z-10 text-white font-bold">reklama</Badge>
            <SkinCard skin={skin} />
          </div>
        ))}
      </div>
    </div>
  );
}
