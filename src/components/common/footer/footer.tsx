import { Link } from "react-router-dom";
import knife from "@/assets/knife-svgrepo-com.svg"; 
import referrals from "@/assets/dotting-people-svgrepo-com.svg";
import userIcon from "@/assets/users-avatar-svgrepo-com.svg";
import coinMain from "@/assets/coin-main.png";
import { useUserStore } from "@/stores/auth/user.store";
import SteamPrivate from "@/private/steam-private";
import { formatBalance } from "@/lib/utils";

export default function Footer() {
  const { user } = useUserStore();
  return (
    <footer className="p-0 fixed left-0 bottom-0 w-full z-50 bg-black/70 backdrop-blur">
      <nav className="flex justify-around items-center h-16 px-4">
        <Link to={"/"} className="flex flex-col items-center">
          <img src={coinMain} alt="Balance" className="w-6 h-6" />
          <span className="text-xs mt-1">{formatBalance(user?.balance ?? 0)}</span>
        </Link>
        <Link to="/skins" className="flex flex-col items-center">
          <img src={knife} alt="Skins" className="w-6 h-6" />
          <span className="text-xs mt-1">Soting</span>
        </Link>
        <Link to="/referrals" className="flex flex-col items-center">
          <img src={referrals} alt="Referrals" className="w-6 h-6" />
          <span className="text-xs mt-1">Do'stlar</span>
        </Link>
        <SteamPrivate>
          <Link to="/profile" className="flex flex-col items-center">
            <img src={userIcon} alt="Profile" className="w-6 h-6" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </SteamPrivate>
      </nav>
    </footer>
  );
}
