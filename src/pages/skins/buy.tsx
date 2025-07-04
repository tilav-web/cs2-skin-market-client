import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ISkin } from "@/interfaces/skin.interface";
import { skinService } from "@/services/skin.service";

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

  return (
    <div className="flex flex-col items-center mt-8">
      <Card className="p-6 w-full max-w-sm flex flex-col items-center gap-4">
        <img src={skin.icon_url} alt={skin.market_hash_name} className="w-32 h-32 object-contain" />
        <div className="font-bold text-lg text-center">{skin.market_hash_name}</div>
        <div className="text-green-600 font-semibold text-xl">{skin.price?.toLocaleString()} tilav</div>
        <Button className="w-full font-bold text-white bg-green-600 hover:bg-green-700 mt-4">Sotib olish</Button>
      </Card>
    </div>
  );
}
