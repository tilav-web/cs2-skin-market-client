import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import coinMain from "@/assets/coin-main.png";
import type { ISkin } from "@/interfaces/skin.interface";

const rarityBadge: { [key: string]: string } = {
  "Mil-Spec": "bg-blue-100 text-blue-700 border-blue-300",
  Classified: "bg-pink-100 text-pink-700 border-pink-300",
  Covert: "bg-red-100 text-red-700 border-red-300",
  Contraband: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Default: "bg-slate-200 text-slate-700 border-slate-300",
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
      "relative flex flex-col justify-between text-center rounded-xl shadow-lg border border-slate-200 bg-gradient-to-b from-white/80 to-slate-200/60 p-3 h-72 min-h-0 select-auto transition-transform hover:scale-105 hover:shadow-2xl overflow-hidden"
    )}
  >
    {/* Rarity badge */}
    <div className="absolute right-3 top-3 z-10">
      <span
        className={cn(
          "px-2 py-0.5 rounded-full text-xs font-bold border",
          rarityBadge[skin.rarity] || rarityBadge.Default
        )}
      >
        {skin.rarity}
      </span>
    </div>
    {/* Image */}
    <div className="bg-white rounded-lg flex items-center justify-center h-24 mb-2 shadow-sm">
      <img
        src={skin.image}
        alt={skin.name}
        className="max-h-20 max-w-full object-contain drop-shadow"
        draggable={false}
      />
    </div>
    {/* Name & Weapon */}
    <div className="flex flex-col flex-grow min-h-0 justify-center">
      <div className="flex items-center justify-center gap-1 mb-1 min-w-0">
        {skin.statTrak && (
          <span className="bg-orange-400/90 text-white text-xs font-bold rounded px-2 py-0.5">
            StatTrak™
          </span>
        )}
        <span className="font-semibold text-sm truncate max-w-[90px]">{skin.weapon}</span>
      </div>
      <p className="text-xs text-gray-700 truncate max-w-full break-words">{skin.name}</p>
      <span className="inline-block rounded-full px-2 py-0.5 text-xs bg-slate-100 text-slate-700 mt-1 border border-slate-300">
        {skin.wear}
      </span>
    </div>
    {/* Price or Sell Button */}
    <div className="mt-3">
      {variant === "buy" ? (
        <Button className="w-full bg-white text-black border border-slate-300 hover:bg-slate-100 h-10 rounded-xl flex items-center justify-center gap-2 shadow font-bold">
          <img src={coinMain} alt="Tilav Coin" className="w-6 h-6" />
          <span className="tracking-wider">{skin.price}</span>
        </Button>
      ) : (
        <Button
          className="w-full bg-white text-black border border-slate-300 hover:bg-slate-100 h-10 rounded-xl font-bold shadow"
          onClick={() => onSellClick?.(skin)}
        >
          Sotish
        </Button>
      )}
    </div>
  </Card>
);
