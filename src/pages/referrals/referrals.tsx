import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stores/auth/user.store";
import { ClipboardCopy, Send } from "lucide-react";
import { useMemo, useEffect } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useReferralsStore } from "@/stores/referrals/referrals.store";
import { botUsername } from "@/common/utils/shared";

export default function Referrals() {
  const user = useUserStore((state) => state.user);
  const { referredUsers, isLoading, fetchReferrals } = useReferralsStore();

  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  const referralLink = useMemo(() => {
    if (user?.telegram_id) {
      return `https://t.me/${botUsername}?start=${user.telegram_id}`;
    }
    return "";
  }, [user?.telegram_id, botUsername]);

  const copyToClipboard = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    toast.success("Referal havolasi nusxalandi!");
  };

  const shareOnTelegram = () => {
    if (!referralLink) return;
    const text = "Mening referal havola orqali botga qo'shiling!";
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent(text)}`;
    window.open(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Do'stlarni taklif qilish</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ushbu havola orqali do'stlaringizni taklif qiling va bonuslarga ega
            bo'ling. Har bir taklif qilingan do'stingiz uchun sizga 500 tilav
            coin bonus beriladi.
          </p>
          <div className="flex items-center space-x-2">
            <Input
              value={referralLink}
              readOnly
              placeholder="Referal havolasi yuklanmoqda..."
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              disabled={!referralLink}
            >
              <ClipboardCopy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={shareOnTelegram}
              disabled={!referralLink}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Taklif qilingan do'stlar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <p className="text-sm text-muted-foreground text-center">
              Yuklanmoqda...
            </p>
          ) : referredUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
              Siz hali hech kimni taklif qilmagansiz.
            </p>
          ) : (
            <ul className="space-y-3">
              {referredUsers.map((friend) => (
                <li
                  key={friend.id}
                  className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={friend.photo}
                        alt={friend.personaname}
                      />
                      <AvatarFallback>
                        {friend.personaname.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{friend.personaname}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-muted-foreground">
                      {new Date(friend.joinDate).toLocaleDateString()}
                    </span>
                    <span className="text-green-600 font-semibold text-xs">
                      +500 tilav
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
