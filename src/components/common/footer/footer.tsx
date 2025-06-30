import { Link } from "react-router-dom";
import { User, ShoppingBag, Settings } from "lucide-react";
import coinMain from "@/assets/coin-main.png";
import { useUserStore } from "@/stores/auth/user.store";

export default function Footer() {

  const { user } = useUserStore()

  return (
    <footer className="p-0 fixed left-0 bottom-0 w-full z-50 bg-black/70 backdrop-blur">
      <nav className="flex justify-between items-center h-16">
        {/* Balance */}
        <div className="flex flex-col items-center flex-1 py-2">
          <img src={coinMain} alt="Balance" className="w-6 h-6" />
          <span className="text-xs mt-1">{user?.balance ?? 0}</span>
        </div>
        {/* My Skins */}
        <Link to="/my-skins" className="flex flex-col items-center flex-1 py-2">
          <ShoppingBag size={24} />
          <span className="text-xs mt-1">Skins</span>
        </Link>
        {/* Profile */}
        <Link to="/profile" className="flex flex-col items-center flex-1 py-2">
          <User size={24} />
          <span className="text-xs mt-1">Profil</span>
        </Link>
        {/* Settings */}
        <Link to="/settings" className="flex flex-col items-center flex-1 py-2">
          <Settings size={24} />
          <span className="text-xs mt-1">Sozlamalar</span>
        </Link>
      </nav>
    </footer>
  )
}
