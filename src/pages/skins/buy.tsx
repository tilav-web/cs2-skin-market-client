import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ISkin } from "@/interfaces/skin.interface";
import { skinService } from "@/services/skin.service";
import { Badge } from "@/components/ui/badge";

export default function BuySkinPage() {
  const { id } = useParams<{ id: string }>();
  const [skin, setSkin] = useState<ISkin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    skinService.getSkinById(id)
      .then(setSkin)
      .catch(() => setError("Skin topilmadi"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-10">Yuklanmoqda...</div>;
  if (error || !skin) return <div className="text-center mt-10 text-red-500">{error || "Skin topilmadi"}</div>;

  // Telegram post link if message_id exists
  let telegramPostUrl: string | null = null;
  if (skin.message_id) {
    telegramPostUrl = `https://t.me/c/${skin.message_id.replace("-100", "")}`;
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full flex flex-col bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      {/* Image section */}
      <div className="flex-shrink-0 w-full flex justify-center items-end" style={{height: '42vh', minHeight: 220, maxHeight: 350}}>
        <img
          src={skin.icon_url}
          alt={skin.market_hash_name}
          className="object-contain h-full max-h-full w-auto drop-shadow-xl"
          style={{maxWidth: '90vw'}}
        />
      </div>
      {/* Info section */}
      <div className="flex-1 flex flex-col items-center px-4 pt-4 pb-32 w-full">
        <Card className="w-full max-w-sm mx-auto flex flex-col items-center gap-4 p-4 shadow-lg rounded-2xl bg-white/90 dark:bg-slate-900/90">
          <div className="w-full flex flex-col items-center gap-2">
            <div className="font-bold text-xl text-center break-words leading-tight">
              {skin.market_hash_name}
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-1">
              <Badge className="bg-green-500 text-white font-bold px-3 py-1 text-xs rounded-full">
                {skin.price.toLocaleString()} tilav
              </Badge>
              {skin.tradable ? (
                <Badge className="bg-blue-500 text-white px-3 py-1 text-xs rounded-full">Tradable</Badge>
              ) : (
                <Badge className="bg-red-500 text-white px-3 py-1 text-xs rounded-full">Sotib bo'lmaydi</Badge>
              )}
              {skin.advertising && (
                <Badge className="bg-yellow-500 text-white px-3 py-1 text-xs rounded-full">Reklama</Badge>
              )}
              <Badge className={
                skin.status === "available"
                  ? "bg-green-600 text-white px-3 py-1 text-xs rounded-full"
                  : skin.status === "pending"
                  ? "bg-yellow-600 text-white px-3 py-1 text-xs rounded-full"
                  : skin.status === "sold"
                  ? "bg-gray-600 text-white px-3 py-1 text-xs rounded-full"
                  : "bg-red-600 text-white px-3 py-1 text-xs rounded-full"
              }>
                {skin.status === "available"
                  ? "Mavjud"
                  : skin.status === "pending"
                  ? "Kutilmoqda"
                  : skin.status === "sold"
                  ? "Sotilgan"
                  : "Bekor qilingan"}
              </Badge>
            </div>
            <div className="flex flex-col gap-1 w-full mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">ClassID:</span>
                <span className="font-medium">{skin.classid}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">InstanceID:</span>
                <span className="font-medium">{skin.instanceid}</span>
              </div>
            </div>
            {telegramPostUrl && (
              <Link
                to={telegramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full text-center text-blue-600 underline text-sm font-medium hover:text-blue-800 transition"
              >
                Telegram postini ko‘rish
              </Link>
            )}
          </div>
        </Card>
      </div>
      {/* Sticky buy button */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-4 z-50 flex justify-center pb-18">
        <Button className="w-full max-w-sm font-bold text-white bg-green-600 hover:bg-green-700 text-lg py-4 rounded-xl shadow-xl">
          Sotib olish
        </Button>
      </div>
    </div>
  );
}
