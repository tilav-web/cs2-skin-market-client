import { SkinCard } from "@/components/common/skin-card";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/auth/user.store";
import coinMain from "@/assets/coin-main.png";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatBalance } from "@/lib/utils";
import { useEffect, useRef, useCallback } from 'react';
import { skinService } from '@/services/skin.service';
import { useAdvertisedSkinsStore } from '@/stores/advertised-skins/advertised-skins.store';

export default function MainPage() {
  const user = useUserStore((state) => state.user);
  const { skins, loading, page, hasMore, setSkins, addSkins, setLoading, setPage, reset } = useAdvertisedSkinsStore();
  const observerTarget = useRef(null);
  const mounted = useRef(false); // Mounted holatini kuzatish uchun ref

  const fetchAdvertisedSkins = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await skinService.getAdvertisedSkins(page);
      if (mounted.current) { // Faqat komponent mounted bo'lsa state ni yangilash
        if (page === 1) {
          setSkins(res.items, res.totalPages);
        } else {
          addSkins(res.items, res.totalPages);
        }
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Reklamadagi skinlarni yuklashda xatolik:", error);
    } finally {
      if (mounted.current) { // Faqat komponent mounted bo'lsa loading ni o'chirish
        setLoading(false);
      }
    }
  }, [loading, hasMore, page, setSkins, addSkins, setLoading, setPage]);

  useEffect(() => {
    mounted.current = true; // Komponent mounted bo'lganda true qilish
    reset(); // Komponent yuklanganda store'ni tozalash
    fetchAdvertisedSkins();

    return () => {
      mounted.current = false; // Komponent unmounted bo'lganda false qilish
    };
  }, [reset, fetchAdvertisedSkins]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchAdvertisedSkins();
        }
      },
      { threshold: 1.0 }
    );

    const currentObserverTarget = observerTarget.current; // Ref qiymatini saqlash

    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [hasMore, loading, fetchAdvertisedSkins]);

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
        {skins.map((skin) => (
          <div key={skin.assetid} className="relative">
            <Badge className="absolute left-2 top-2 z-10 text-white font-bold">reklama</Badge>
            <SkinCard skin={skin} />
          </div>
        ))}
        {loading && (
          <div className="col-span-2 text-center py-4">Yuklanmoqda...</div>
        )}
        {!hasMore && !loading && skins.length > 0 && (
          <div className="col-span-2 text-center text-gray-500 py-4">
            Reklama bo'limidagi barcha skinlar ko'rsatildi.
          </div>
        )}
        <div ref={observerTarget} className="col-span-2 h-1"></div> {/* Observer target */}
      </div>
    </div>
  );
}

