import { useUserStore } from "@/stores/auth/user.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Phone, Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import type { ITransaction } from "@/interfaces/transaction.interface";
import coinMain from "@/assets/coin-main.png";
import { useEffect, useState, type ElementType } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

const STEAM_PRIVACY_URL = "https://steamcommunity.com/my/edit/settings";

// MOCK TRANSACTIONS
const mockTransactions: ITransaction[] = [
  {
    _id: "1",
    user: "user1",
    amount: 50000,
    type: "deposit",
    status: "completed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    user: "user1",
    amount: 20000,
    type: "withdraw",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    user: "user1",
    amount: 1550,
    type: "sale",
    status: "completed",
    skin: {
      name: "Redline",
      wear: "Field-Tested",
      image: "https://cdn.csgoskins.gg/public/uih/weapons/aHR0cHM6Ly9jZG4uY3Nnb3NraW5zLmdnL3B1YmxpYy9pbWFnZXMvYnVja2V0cy9lY29uL3dlYXBvbnMvYmFzZV93ZWFwb25zL3dlYXBvbl9hazQ3LmQwMGQxZGZhMDk2MjFjMjk3Njk2ZTM1M2Y0MTMzMzBjOTRlZDUwOTAucG5n/auto/auto/85/notrim/06be7f9eb59aeebc19509c82a43a82b5.webp",
      rarity: "Classified",
      statTrak: false,
      weapon: "AK-47",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    user: "user1",
    amount: 7500,
    type: "buy",
    status: "completed",
    skin: {
      name: "Asiimov",
      wear: "Battle-Scarred",
      image: "https://cdn.csgoskins.gg/public/uih/weapons/aHR0cHM6Ly9jZG4uY3Nnb3NraW5zLmdnL3B1YmxpYy9pbWFnZXMvYnVja2V0cy9lY29uL3dlYXBvbnMvYmFzZV93ZWFwb25zL3dlYXBvbl9hazQ3LmQwMGQxZGZhMDk2MjFjMjk3Njk2ZTM1M2Y0MTMzMzBjOTRlZDUwOTAucG5n/auto/auto/85/notrim/06be7f9eb59aeebc19509c82a43a82b5.webp",
      rarity: "Covert",
      statTrak: false,
      weapon: "AWP",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const typeMap: Record<ITransaction["type"], { label: string; icon?: ElementType; color: string }> = {
  deposit: { label: "Hisob to'ldirish", icon: ArrowDownCircle, color: "text-green-600" },
  withdraw: { label: "Pul yechish", icon: ArrowUpCircle, color: "text-yellow-600" },
  sale: { label: "Skin sotish", color: "" },
  buy: { label: "Skin sotib olish", color: "" },
  bonus: { label: "Bonus", icon: Wallet, color: "text-pink-600" },
};

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  // Trade URL uchun state
  const [tradeUrl, setTradeUrl] = useState(user?.trade_url || "");
  const [isEditingTradeUrl, setIsEditingTradeUrl] = useState(false);
  const [isTradeUrlChanged, setIsTradeUrlChanged] = useState(false);

  useEffect(() => {
    (() => {
      if (!user?.steam_id) {
        navigate("/auth");
      }
    })()
  }, [navigate, user?.steam_id])

  // user o'zgarganda tradeUrl ni yangilash
  useEffect(() => {
    setTradeUrl(user?.trade_url || "");
    setIsTradeUrlChanged(false);
    setIsEditingTradeUrl(false);
  }, [user?.trade_url]);

  // Trade URL ni saqlash funksiyasi (hozircha faqat frontda)
  const handleSaveTradeUrl = () => {
    // TODO: API chaqiruv qilish mumkin
    // Masalan: updateUser({ trade_url: tradeUrl })
    setIsEditingTradeUrl(false);
    setIsTradeUrlChanged(false);
    // Toast yoki xabar chiqarish mumkin
  };

  return (
    <div className="w-full max-w-md mx-auto p-2 flex flex-col gap-4">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="flex flex-row items-center gap-3 bg-muted/30 p-4">
          <Avatar className="h-14 w-14 border-2 border-primary/50">
            <AvatarFallback className="bg-primary/10">
              <User className="h-7 w-7 text-primary" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{user?.personaname || "Foydalanuvchi"}</CardTitle>
            <CardDescription className="text-sm">@{user?.telegram_id || "telegram_id"}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-4 grid gap-3">
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Telefon raqam</p>
              <p className="font-semibold text-sm">{user?.phone || "Kiritilmagan"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border p-3 justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Balans</p>
                <p className="font-semibold flex items-center gap-1 text-base">
                  <img src={coinMain} alt="Tilav Coin" className="w-4 h-4" />
                  {user?.balance?.toLocaleString() ?? 0} tilav
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="p-2" title="Hisobni to'ldirish">
                <ArrowDownCircle className="h-5 w-5 text-green-600" />
              </Button>
              <Button variant="outline" size="icon" className="p-2" title="Pul yechish">
                <ArrowUpCircle className="h-5 w-5 text-yellow-600" />
              </Button>
            </div>
          </div>
          {/* Trade URL textarea */}
          <div className="flex flex-col gap-2 rounded-lg border p-3">
            <label htmlFor="trade-url" className="text-xs text-muted-foreground font-medium mb-1">
              Steam Trade URL
            </label>
            <Textarea
              id="trade-url"
              className="resize-none min-h-[40px] text-sm focus:outline-primary"
              value={tradeUrl}
              placeholder="Trade URL kiriting"
              onFocus={() => setIsEditingTradeUrl(true)}
              onChange={e => {
                setTradeUrl(e.target.value);
                setIsTradeUrlChanged(e.target.value !== (user?.trade_url || ""));
              }}
              disabled={!user?.steam_id}
            />
            {isEditingTradeUrl && isTradeUrlChanged && (
              <Button size="sm" className="self-end mt-1 text-white" onClick={handleSaveTradeUrl}>
                Saqlash
              </Button>
            )}
          </div>
        </CardContent>
          <CardFooter className="bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              Skin savdosi uchun Steam inventar profilingiz ochiq bo'lishi kerak. 
              <a
                href={STEAM_PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                Sozlamalarga o'tish
              </a>
            </p>
          </CardFooter>
      </Card>

      {/* Transaction History */}
      <Card className="shadow-md">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">Hisob harakatlari</CardTitle>
          <CardDescription className="text-xs">Barcha to'lovlar, yechishlar va skin savdolari</CardDescription>
        </CardHeader>
        <CardContent className="divide-y p-0">
          {mockTransactions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">Hozircha tranzaksiyalar yo'q</div>
          ) : (
            mockTransactions.map((tx) => {
              const TypeIcon = typeMap[tx.type].icon;
              return (
                <div key={tx._id} className="flex items-center gap-3 py-3 px-4">
                  {/* Only icon for deposit/withdraw/bonus, only skin image for sale/buy */}
                  {((tx.type === "deposit" || tx.type === "withdraw" || tx.type === "bonus") && TypeIcon) ? (
                    <div className={`rounded-full bg-muted p-2 ${typeMap[tx.type].color}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                  ) : null}
                  {(tx.type === "sale" || tx.type === "buy") && tx.skin ? (
                    <div className="flex items-center">
                      <img
                        src={tx.skin.image}
                        alt={tx.skin.name}
                        className="w-10 h-10 rounded-lg shadow border object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="flex-1">
                    <div className="font-semibold flex items-center gap-2 text-sm">
                      {typeMap[tx.type].label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(tx.createdAt).toLocaleString("uz-UZ")}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold text-sm ${tx.type === "withdraw" ? "text-yellow-600" : tx.type === "deposit" ? "text-green-600" : "text-primary"}`}>
                      {tx.type === "withdraw" || tx.type === "buy" ? "-" : "+"}
                      {tx.amount.toLocaleString()} tilav
                    </span>
                    <div className={`text-xs ${tx.status === "completed" ? "text-green-600" : tx.status === "pending" ? "text-yellow-600" : "text-red-600"}`}>
                      {tx.status === "completed" ? "Yakunlandi" : tx.status === "pending" ? "Kutilmoqda" : "Bekor qilingan"}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
