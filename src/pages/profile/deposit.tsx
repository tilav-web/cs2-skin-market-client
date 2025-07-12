
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { clientApi } from '@/common/api/client-api';
import { useUserStore } from '@/stores/auth/user.store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function DepositPage() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserStore();

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || +amount <= 0) {
      setError('Iltimos, to'g'ri summa kiriting.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await clientApi.initiateDeposit(+amount);
      if (response.url) {
        // Foydalanuvchini Click to'lov sahifasiga yo'naltirish
        window.location.href = response.url;
      }
    } catch (err) {
      setError('To'lovni boshlashda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.');
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
          <CardDescription>Click orqali hisobingizni oson to'ldiring.</CardDescription>
        </CardHeader>
        <form onSubmit={handleDeposit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Summa (so'm)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Masalan, 50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading}
                  min="1000"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Kuting...' : 'To'lov qilish'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
