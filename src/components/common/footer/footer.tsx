import { Link, useLocation } from "react-router-dom";
import { User, ShoppingBag, Users } from "lucide-react";
import coinMain from "@/assets/coin-main.png";
import { useUserStore } from "@/stores/auth/user.store";
import { cn } from "@/lib/utils";

export default function Footer() {

  const { user } = useUserStore()
  const location = useLocation();

  // Helper to check if a route is active
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    return location.pathname.startsWith(path) && path !== "/";
  };

  return (
    <footer className="p-0 fixed left-0 bottom-0 w-full z-50 bg-black/70 backdrop-blur">
      <nav className="flex justify-between items-center h-16">
        {/* Balance */}
        <Link to={'/'} className={cn("flex flex-col items-center flex-1 py-2", isActive("/") ? "text-white" : "text-muted-foreground") }>
          <img src={coinMain} alt="Balance" className="w-6 h-6" />
          <span className="text-xs mt-1">{user?.balance ?? 0}</span>
        </Link>
        {/* My Skins */}
        <Link to="/skins" className={cn("flex flex-col items-center flex-1 py-2", isActive("/skins") ? "text-white" : "text-muted-foreground") }>
          <ShoppingBag size={24} />
          <span className="text-xs mt-1">Skins</span>
        </Link>
        {/* Settings */}
        <Link to="/referrals" className={cn("flex flex-col items-center flex-1 py-2", isActive("/referrals") ? "text-white" : "text-muted-foreground") }>
          <Users size={24} />
          <span className="text-xs mt-1">Do'stlar</span>
        </Link>
        {/* Profile */}
        <Link to="/profile" className={cn("flex flex-col items-center flex-1 py-2", isActive("/profile") ? "text-white" : "text-muted-foreground") }>
          <User size={24} />
          <span className="text-xs mt-1">Profil</span>
        </Link>
      </nav>
    </footer>
  )
}
