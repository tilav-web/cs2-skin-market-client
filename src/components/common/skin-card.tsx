import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import coinMain from "@/assets/coin-main.png";
import type { ISkin } from "@/interfaces/skin.interface";

const rarityColors: { [key: string]: string } = {
  "Mil-Spec": "bg-blue-900/70 text-white",
  Classified: "bg-pink-900/70 text-white",
  Covert: "bg-red-900/70 text-white",
  Contraband: "bg-yellow-800/70 text-white",
  Default: "bg-indigo-900/70 text-white",
};

interface SkinCardProps {
  skin: ISkin;
  variant?: "buy" | "sell";
  onSellClick?: (skin: ISkin) => void;
}

export const SkinCard = ({
  skin,
  variant = "buy",
  onSellClick,
}: SkinCardProps) => (
  <Card
    className={cn(
      "flex flex-col justify-between text-center border-none p-2 h-64 select-auto transition-transform hover:scale-105 hover:shadow-lg",
      rarityColors[skin.rarity] || rarityColors.Default
    )}
  >
    <div className="h-24 flex items-center justify-center mt-2 p-0.5">
      <img
        src={skin.image}
        alt={skin.name}
        className="w-full h-full object-contain"
      />
    </div>
    <div>
      <h3 className="font-bold text-xs">
        {skin.statTrak ? `StatTrak™ ${skin.weapon}` : skin.weapon}
      </h3>
      <p className="text-sm text-gray-300">
        {skin.name} ({skin.wear})
      </p>
    </div>
    {variant === "buy" ? (
      <Button className="w-full bg-white/10 hover:bg-white/20 h-9 rounded-xl">
        <img src={coinMain} alt="Tilav Coin" className="w-6 h-6" />
        <span className="font-bold text-white tracking-wider">
          {skin.price}
        </span>
      </Button>
    ) : (
      <Button
        className="w-full bg-blue-500/70 backdrop-blur hover:bg-blue-500/80 h-9 rounded-xl text-white font-bold"
        onClick={() => onSellClick?.(skin)}
      >
        Sotish
      </Button>
    )}
  </Card>
);
