import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import type { ISkin } from "@/interfaces/skin.interface";
import { Link, useLocation } from "react-router-dom"; // useLocation ni import qilamiz
import coinMain from '@/assets/coin-main.png'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useState } from "react";
import { skinService } from "@/services/skin.service";
import { toast } from "sonner";
import { useAdvertisedSkinsStore } from "@/stores/advertised-skins/advertised-skins.store";

interface SkinCardProps {
  skin: ISkin;
  // variant?: "buy" | "sell"; // variant propini olib tashladik
  onSellClick?: (skin: ISkin) => void;
}

export const SkinCard = ({
  skin,
  // variant = "buy", // variant propini olib tashladik
  onSellClick,
}: SkinCardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { updateAdvertisedSkin } = useAdvertisedSkinsStore();
  const location = useLocation(); // useLocation hookini olamiz

  const handleCancelSale = async () => {
    try {
      const updatedSkin = await skinService.cancelSale(skin._id);
      toast.success("Skin sotuvdan olib tashlandi!");
      updateAdvertisedSkin(skin._id, updatedSkin);
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Failed to cancel sale:", error);
      toast.error("Skinni sotuvdan olib tashlashda xatolik yuz berdi.");
    }
  };

  // Joriy yo'l /skins ekanligini tekshiramiz
  const isSkinsPage = location.pathname === '/skins';

  return (
    <Card
      className={cn(
        "relative flex flex-col gap-2 text-center rounded-xl shadow-lg border border-slate-200 bg-gradient-to-b from-white/80 to-slate-220/60 p-3 min-h-0 select-auto transition-transform overflow-hidden",
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
        <span className="inline-block rounded-xl px-2 py-0.5 text-xs bg-slate-100 text-slate-700 mt-1 border border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
          {skin.market_hash_name}
        </span>
        {!skin.tradable && (
          <span
            className={
              "inline-block rounded-full px-2 py-0.5 text-xs mt-1 border font-bold bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-white dark:border-red-700"
            }
          >
            {skin.tradable ? "" : "Sotib bo'lmaydi"}
          </span>
        )}
      </div>
      {/* Buttons based on context */}
      <div className="mt-3">
        {isSkinsPage && skin.tradable && skin.status === "available" ? (
          <Button
            className="w-full bg-white text-black border border-slate-300 hover:bg-slate-100 h-10 rounded-xl font-bold shadow dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:bg-slate-800"
            onClick={() => onSellClick?.(skin)}
            disabled={!skin.tradable}
          >
            Sotish
          </Button>
        ) : isSkinsPage && skin.status === "pending" ? (
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button className="w-full bg-red-500 text-white border border-slate-300 hover:bg-red-600 h-10 rounded-xl font-bold shadow dark:bg-red-900 dark:text-white dark:border-red-700 dark:hover:bg-red-800">
                Bekor qilish
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Sotuvni bekor qilish</DrawerTitle>
                <DrawerDescription>
                  Rostan ham bu skinni sotuvdan olib tashlamoqchimisiz?
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                  Bekor qilish
                </Button>
                <Button onClick={handleCancelSale}>Tasdiqlash</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : skin.tradable && typeof skin.price === "number" ? (
          <Button
            asChild
            className="w-full bg-white text-black border border-slate-300 hover:bg-slate-100 h-10 rounded-xl font-bold shadow dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <Link className="flex items-center gap-1" to={`/skins/buy/${skin._id}`}>
              <img className="w-4 h-4" src={coinMain} alt={skin.market_hash_name} />
              {skin.price.toLocaleString()}
            </Link>
          </Button>
        ) : null}
      </div>
    </Card>
  );
};
