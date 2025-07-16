import { useUserStore } from "@/stores/auth/user.store";
import { useTransactionsStore } from "@/stores/transactions/transactions.store";
import { transactionService } from "@/services/transaction.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Phone,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  HandCoins,
} from "lucide-react";
import type { ITransaction } from "@/interfaces/transaction.interface";
import coinMain from "@/assets/coin-main.png";
import { useEffect, useState, type ElementType } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { formatBalance } from "@/lib/utils";
import { toast } from "sonner";
import { userService } from "@/services/user.service";

const STEAM_PRIVACY_URL = "https://steamcommunity.com/my/edit/settings";
const STEAM_TRADE_URL = "https://steamcommunity.com/my/tradeoffers/privacy";

// MOCK TRANSACTIONS
const typeMap: Record<
  ITransaction["type"],
  { label: string; icon?: ElementType; color: string }
> = {
  deposit: {
    label: "Hisob to'ldirish",
    icon: ArrowDownCircle,
    color: "text-green-600",
  },
  withdraw: {
    label: "Pul yechish",
    icon: ArrowUpCircle,
    color: "text-yellow-600",
  },
  sale: { label: "Skin sotish", color: "" },
  buy: { label: "Skin sotib olish", color: "" },
  bonus: { label: "Bonus", icon: Wallet, color: "text-pink-600" },
};

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const { transactions, setTransactions } = useTransactionsStore();
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [transactionsError, setTransactionsError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoadingTransactions(true);
        const data = await transactionService.getUserTransactions();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setTransactionsError("Tranzaksiyalarni yuklashda xatolik yuz berdi.");
      } finally {
        setLoadingTransactions(false);
      }
    };

    // Agar user undefined bo'lmasa (ya'ni yuklanmoqda bo'lmasa) va user mavjud bo'lsa
    if (user !== undefined && user) {
      fetchTransactions();
    }
  }, [user, setTransactions]);

  // Trade URL uchun state
  const [tradeUrl, setTradeUrl] = useState(user?.trade_url || "");
  const [isEditingTradeUrl, setIsEditingTradeUrl] = useState(false);
  const [isTradeUrlChanged, setIsTradeUrlChanged] = useState(false);

  useEffect(() => {
    // Agar user undefined bo'lmasa (ya'ni yuklanmoqda bo'lmasa) va user null bo'lsa yoki steam_id yo'q bo'lsa
    if (user !== undefined && (!user || !user.steam_id)) {
      navigate("/auth");
    }
  }, [navigate, user]); // user.steam_id o'rniga user ni kuzatamiz

  // user o'zgarganda tradeUrl ni yangilash
  useEffect(() => {
    setTradeUrl(user?.trade_url || "");
    setIsTradeUrlChanged(false);
    setIsEditingTradeUrl(false);
  }, [user?.trade_url]);

  // Trade URL ni saqlash funksiyasi
  const handleSaveTradeUrl = async () => {
    if (!user) return;
    try {
      const updatedUser = await userService.updateTradeUrl(tradeUrl);
      useUserStore.setState({ user: updatedUser }); // User store'ni yangilash
      toast.success("Trade URL muvaffaqiyatli saqlandi!");
      setIsEditingTradeUrl(false);
      setIsTradeUrlChanged(false);
    } catch (error) {
      console.error("Trade URLni saqlashda xatolik yuz berdi:", error);
      toast.error("Trade URLni saqlashda xatolik yuz berdi.");
    }
  };

  // User ma'lumotlari yuklanmoqda bo'lsa (undefined holati)
  if (user === undefined) {
    return (
      <div className="flex justify-center items-center h-full py-12 text-gray-400">
        Foydalanuvchi ma'lumotlari yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-1 flex flex-col gap-2">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="flex flex-row items-center gap-3 bg-muted/30 p-4">
          <Avatar className="h-14 w-14 border-2 border-primary/50">
            {user?.photo ? (
              <AvatarImage src={user.photo} alt={user.personaname || "User"} />
            ) : null}
            <AvatarFallback className="bg-primary/10">
              <User className="h-7 w-7 text-primary" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              {user?.personaname || "Foydalanuvchi"}
            </CardTitle>
            <CardDescription className="text-sm">
              @{user?.telegram_id || "telegram_id"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-4 grid gap-3">
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Telefon raqam</p>
              <p className="font-semibold text-sm">
                {user?.phone || "Kiritilmagan"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border p-3 justify-between">
            <div className="flex items-center gap-3">
              <HandCoins className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Cashback</p>
                <p className="font-semibold flex items-center gap-1 text-base">
                  <img src={coinMain} alt="Tilav Coin" className="w-4 h-4" />
                  {formatBalance(user?.cashback ?? 0)} tilav
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border p-3 justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Balans</p>
                <p className="font-semibold flex items-center gap-1 text-base">
                  <img src={coinMain} alt="Tilav Coin" className="w-4 h-4" />
                  {formatBalance(user?.balance ?? 0)} tilav
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="p-2"
                title="Hisobni to'ldirish"
                onClick={() => navigate("/profile/deposit")}
              >
                <ArrowDownCircle className="h-5 w-5 text-green-600" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="p-2"
                title="Pul yechish"
              >
                <ArrowUpCircle className="h-5 w-5 text-yellow-600" />
              </Button>
            </div>
          </div>
          {/* Trade URL textarea */}
          <div className="flex flex-col gap-2 rounded-lg border p-3">
            <label
              htmlFor="trade-url"
              className="text-xs text-muted-foreground font-medium mb-1"
            >
              Steam Trade URL
            </label>
            <Textarea
              id="trade-url"
              className="resize-none min-h-[40px] text-sm focus:outline-primary"
              value={tradeUrl}
              placeholder="Trade URL kiriting"
              onFocus={() => setIsEditingTradeUrl(true)}
              onChange={(e) => {
                setTradeUrl(e.target.value);
                setIsTradeUrlChanged(
                  e.target.value !== (user?.trade_url || "")
                );
              }}
              disabled={!user?.steam_id}
            />
            {isEditingTradeUrl && isTradeUrlChanged && (
              <Button
                size="sm"
                className="self-end mt-1 text-white"
                onClick={handleSaveTradeUrl}
              >
                Saqlash
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">
            Skin savdosi uchun Steam inventar profilingiz ochiq bo'lishi kerak va trade url kerak bo'ladi.
            <a
              href={STEAM_PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Profilni public qilish
            </a>
            <a
              href={STEAM_TRADE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Trade url olish
            </a>
          </p>
        </CardFooter>
      </Card>

      {/* Transaction History */}
      <Card className="shadow-md">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">Hisob harakatlari</CardTitle>
          <CardDescription className="text-xs">
            Barcha to'lovlar, yechishlar va skin savdolari
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y p-0">
          {loadingTransactions ? (
            <div className="text-center text-muted-foreground py-8">
              Tranzaksiyalar yuklanmoqda...
            </div>
          ) : transactionsError ? (
            <div className="text-center text-red-500 py-8">
              {transactionsError}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              Hozircha tranzaksiyalar yo'q
            </div>
          ) : (
            transactions.map((tx) => {
              const TypeIcon = typeMap[tx.type].icon;
              return (
                <div key={tx._id} className="flex items-center gap-3 py-3 px-4">
                  {/* Only icon for deposit/withdraw/bonus, only skin image for sale/buy */}
                  {(tx.type === "deposit" ||
                    tx.type === "withdraw" ||
                    tx.type === "bonus") &&
                  TypeIcon ? (
                    <div
                      className={`rounded-full bg-muted p-2 ${
                        typeMap[tx.type].color
                      }`}
                    >
                      <TypeIcon className="h-5 w-5" />
                    </div>
                  ) : null}
                  {(tx.type === "sale" || tx.type === "buy") && tx.skin ? (
                    <div className="flex items-center">
                      <img
                        src={tx.skin.icon_url}
                        alt={tx.skin.market_hash_name}
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
                    <span
                      className={`font-bold text-sm ${
                        tx.type === "withdraw"
                          ? "text-yellow-600"
                          : tx.type === "deposit"
                          ? "text-green-600"
                          : "text-primary"
                      }`}
                    >
                      {tx.type === "withdraw" || tx.type === "buy" ? "-" : "+"}
                      {tx.amount.toLocaleString()} tilav
                    </span>
                    <div
                      className={`text-xs ${
                        tx.status === "completed"
                          ? "text-green-600"
                          : tx.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >Yakunlandi</div>
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