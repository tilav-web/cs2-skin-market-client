import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ISkin } from "@/interfaces/skin.interface";

// TODO: Replace with real API call
const mockSkins: ISkin[] = [
  {
    assetid: "1",
    classid: "1",
    instanceid: "1",
    market_hash_name: "AK-47 | Redline (Field-Tested)",
    icon_url: "https://community.akamai.steamstatic.com/economy/image/class/730/302188936/200fx200f",
    tradable: true,
    price: 12345,
  },
];

export default function BuySkinPage() {
  const { assetid } = useParams<{ assetid: string }>();
  const [skin, setSkin] = useState<ISkin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API call
    const found = mockSkins.find((s) => s.assetid === assetid);
    setSkin(found || null);
    setLoading(false);
  }, [assetid]);

  if (loading) return <div className="text-center mt-10">Yuklanmoqda...</div>;
  if (!skin) return <div className="text-center mt-10 text-red-500">Skin topilmadi</div>;

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
