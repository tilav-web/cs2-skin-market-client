import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaSteam } from "react-icons/fa";
import coinMain from "@/assets/coin-main.png";
import { serverUrl } from "@/common/utils/shared";

export default function Auth() {
  return (
    <div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <Card className="w-[370px] shadow-2xl border-none bg-black/20 backdrop-blur-md">
        <CardHeader className="flex flex-col items-center gap-2">
          <img src={coinMain} alt="Tilav Coin" className="w-24 h-24 mb-2 drop-shadow-lg animate-bounce" />
          <CardTitle className="text-2xl font-extrabold text-center text-white tracking-wide">CS2 Skin Market</CardTitle>
          <CardDescription className="text-center text-base text-gray-300 mt-2">
            Faqat Steam orqali tizimga kiring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a href={`${serverUrl}/users/steam?initData=${window.Telegram?.WebApp.initData}`}>
            <Button className="w-full text-lg font-bold cursor-pointer bg-gradient-to-r from-[#171A21] to-[#2A475E] text-white hover:from-[#2A475E] hover:to-[#171A21] py-6 rounded-xl shadow-lg mt-2">
              <FaSteam className="mr-3 h-7 w-7" />
              Steam orqali kirish
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
