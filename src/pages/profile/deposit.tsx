import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/auth/user.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clickService } from "@/services/click.service";

export function DepositPage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    if (window.Telegram?.WebApp?.BackButton) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(() => window.history.back());
    }

    return () => {
      if (window.Telegram?.WebApp?.BackButton) {
        window.Telegram.WebApp.BackButton.hide();
        window.Telegram.WebApp.BackButton.offClick(() => window.history.back());
      }
    };
  }, []);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || +amount <= 0) {
      setError("Iltimos, to'g'ri summa kiriting.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await clickService.initiateClickDeposit(+amount);
      if (data.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch (err) {
      setError(
        "To'lovni boshlashda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Iltimos, avval tizimga kiring.</div>;
  }

  return (
    <div className="flex justify-center items-center h-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Hisobni to'ldirish</CardTitle>
          <CardDescription>
            Click orqali hisobingizni oson to'ldiring.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleDeposit} className="flex flex-col gap-2">
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Summa (so'm)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Masalan, 50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading}
                  min="1000"
                  step="1000"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full text-white font-bold"
              disabled={loading}
            >
              {loading ? "Kuting..." : "To'lov qilish"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
