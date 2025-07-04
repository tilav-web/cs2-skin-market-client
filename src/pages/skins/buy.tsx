import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ISkin } from "@/interfaces/skin.interface";
import { skinService } from "@/services/skin.service";
import coinMain from "@/assets/coin-main.png";

export default function BuySkinPage() {
  const { id } = useParams<{ id: string }>();
  const [skin, setSkin] = useState<ISkin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    skinService
      .getSkinById(id)
      .then(setSkin)
      .catch(() => setError("Skin topilmadi"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-10">Yuklanmoqda...</div>;
  if (error || !skin)
    return (
      <div className="text-center mt-10 text-red-500">
        {error || "Skin topilmadi"}
      </div>
    );

  // Telegram post link if message_id exists
  let telegramPostUrl: string | null = null;
  if (skin.message_id) {
    telegramPostUrl = `https://t.me/c/${skin.message_id.replace("-100", "")}`;
  }
  const holat =
    skin.status === "sold"
      ? "sotilgan"
      : skin.status === "pending"
      ? "kutilmoqda"
      : skin.status === "available"
      ? "mavjud"
      : "bekor qilingan";

  return (
    <div className="absolute top-0 left-0 h-full w-full flex flex-col bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      {/* Image section */}
      <div
        className="flex-shrink-0 w-full flex justify-center items-end"
        style={{ height: "42vh", minHeight: 220, maxHeight: 350 }}
      >
        <img
          src={skin.icon_url}
          alt={skin.market_hash_name}
          className="object-contain h-full max-h-full w-auto drop-shadow-xl"
          style={{ maxWidth: "90vw" }}
        />
      </div>
      {/* Info section */}
      <div className="flex-1 flex flex-col items-center px-4 pt-4 pb-32 w-full">
        <Card className="w-full max-w-sm mx-auto flex flex-col items-center gap-4 p-5 shadow-lg rounded-2xl bg-white/90 dark:bg-slate-900/90">
          {/* Title */}
          <div className="w-full flex flex-col items-center gap-1 mb-2">
            <div className="font-bold text-xl text-center break-words leading-tight mb-2">
              {skin.market_hash_name}
            </div>
          </div>
          {/* Table */}
          <div className="w-full">
            <table className="w-full text-sm rounded-xl overflow-hidden bg-black/80 dark:bg-black/90 text-white">
              <div>
                <div className="border-b border-gray-700 flex items-center justify-between">
                  <p className="py-2 px-3 font-medium flex-1">Egasi</p>
                  <p className="py-2 px-3 text-right">
                    <span className="flex items-center gap-2">
                      <img
                        src="https://avatars.githubusercontent.com/u/583231?v=4"
                        alt="Tilav"
                        className="w-6 h-6 rounded-full"
                      />
                      Tilav
                    </span>
                  </p>
                </div>
                <div className="border-b border-gray-700 flex items-center justify-between">
                  <p className="py-2 px-3 font-medium">Narx</p>
                  <p>
                    <img
                      src={coinMain}
                      alt="Tilav Coin"
                      className="w-4 h-4 inline-block"
                    />
                    {skin.price.toLocaleString()}{" "}
                  </p>
                </div>
                <div>
                  <p className="py-2 px-3 font-medium flex-1">Holati</p>
                  <p>{holat}</p>
                </div>
                <div>
                  <p className="py-2 px-3 font-medium flex-1">Telegram channel</p>
                  <Link to={telegramPostUrl ?? ""}>post</Link>
                </div>
              </div>
            </table>
          </div>
        </Card>
      </div>
      {/* Sticky buy button */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-4 z-50 flex justify-center pb-22">
        <Button className="w-full max-w-sm font-bold text-white bg-green-600 hover:bg-green-700 text-lg py-4 rounded-xl shadow-xl">
          Sotib olish
        </Button>
      </div>
    </div>
  );
}
