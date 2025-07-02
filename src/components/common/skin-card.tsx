import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import type { ISkin } from "@/interfaces/skin.interface";

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
      "relative flex flex-col justify-between text-center rounded-xl shadow-lg border border-slate-200 bg-gradient-to-b from-white/80 to-slate-200/60 p-3 h-72 min-h-0 select-auto transition-transform hover:scale-105 hover:shadow-2xl overflow-hidden",
      "dark:border-slate-700 dark:bg-gradient-to-b dark:from-slate-900/80 dark:to-slate-800/60"
    )}
  >
    {/* Image */}
    <div className="bg-white rounded-lg flex items-center justify-center h-24 mb-2 shadow-sm dark:bg-slate-900">
      <img
        src={skin.icon_url}
        alt={skin.market_hash_name}
        className="max-h-20 max-w-full object-contain drop-shadow"
        draggable={false}
      />
    </div>
    {/* Name & IDs */}
    <div className="flex flex-col flex-grow min-h-0 justify-center">
      <span className="inline-block rounded-full px-2 py-0.5 text-xs bg-slate-100 text-slate-700 mt-1 border border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
        {skin.market_hash_name}
      </span>
      {!skin.tradable && (
        <span
          className={"inline-block rounded-full px-2 py-0.5 text-xs mt-1 border font-bold bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-white dark:border-red-700"}
        >
          {skin.tradable ? "" : "Sotib bo'lmaydi"}
        </span>
      )}
    </div>
    {/* Sell Button */}
    <div className="mt-3">
      {variant === "sell" && (
        <Button
          className="w-full bg-white text-black border border-slate-300 hover:bg-slate-100 h-10 rounded-xl font-bold shadow dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:bg-slate-800"
          onClick={() => onSellClick?.(skin)}
          disabled={!skin.tradable}
        >
          Sotish
        </Button>
      )}
    </div>
  </Card>
);
