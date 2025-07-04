import { SkinCard } from "@/components/common/skin-card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Remove unused
import type { ISkin } from "@/interfaces/skin.interface";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/auth/user.store";
import coinMain from "@/assets/coin-main.png";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatBalance } from "@/lib/utils";
import { useEffect, useState } from 'react';
import { skinService } from '@/services/skin.service';

export default function MainPage() {
  const user = useUserStore((state) => state.user);
  const [skins, setSkins] = useState<ISkin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    skinService.getAdvertisingPendingSkins()
      .then(setSkins)
      .catch(() => setError('Skinlarni yuklashda xatolik'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Coin image center */}
      <div className="flex flex-col items-center mb-2">
        <img src={coinMain} alt="Tilav Coin" className="w-26 h-26" />
        <p className="font-bold text-xl">Tilav coin</p>
        <p className="text-center text-sm text-gray-500">Tilav coin yordamida skin-lar sotib oling.<br/><strong>1 so'm = 1 tilav.</strong></p>
      </div>
      {/* Balance card */}
      <div className="flex justify-center mb-6">
        <Card className="flex flex-col items-center gap-2 p-6 w-full max-w-xs">
          <span className="text-gray-500 text-sm">Sizning balansingiz</span>
          <span className="font-bold text-2xl flex items-center gap-2">
            <img src={coinMain} alt="Tilav Coin" className="w-6 h-6" />
            {formatBalance(user?.balance ?? 0)}
          </span>
          <Button className="mt-2 w-full text-white font-bold">Hisobni to'ldirish</Button>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {loading && <div className="col-span-2 text-center">Yuklanmoqda...</div>}
        {error && <div className="col-span-2 text-center text-red-500">{error}</div>}
        {!loading && !error && skins.length === 0 && (
          <div className="col-span-2 text-center">Hozircha reklamaga qo'yilgan skinlar yo'q</div>
        )}
        {skins.map((skin) => (
          <div key={skin.assetid} className="relative">
            <Badge className="absolute left-2 top-2 z-10 text-white font-bold">reklama</Badge>
            <SkinCard skin={skin} />
          </div>
        ))}
      </div>
    </div>
  );
}
