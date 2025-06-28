import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { DollarSign } from "lucide-react";
import type { ISkin } from "@/interfaces/skin.interface";

const rarityColors: { [key: string]: string } = {
  "Mil-Spec": "bg-blue-900/70 text-white",
  Classified: "bg-pink-900/70 text-white",
  Covert: "bg-red-900/70 text-white",
  Contraband: "bg-yellow-800/70 text-white",
  Default: "bg-indigo-900/70 text-white",
};

export const SkinCard = ({ skin }: { skin: ISkin }) => (
  <Card
    className={cn(
      "overflow-hidden flex flex-col justify-between text-center border-none p-3",
      rarityColors[skin.rarity] || rarityColors.Default
    )}
  >
    <div className="flex-grow flex items-center justify-center">
      <img
        src={skin.image}
        alt={skin.skinName}
        className="w-full h-auto max-h-24 object-contain"
      />
    </div>

    <div>
      <h3 className="font-bold text-md line-clamp-2">
        {skin.statTrak ? `StatTrak™ ${skin.weapon}` : skin.weapon}
      </h3>
      <p className="text-sm text-gray-300 truncate">
        {skin.skinName} ({skin.wear})
      </p>
    </div>

    <Button className="w-full bg-white/10 hover:bg-white/20 h-9 rounded-xl">
      <DollarSign color="white" size={16} />
      <span className="font-bold text-white tracking-wider">{skin.price}</span>
    </Button>
  </Card>
);
