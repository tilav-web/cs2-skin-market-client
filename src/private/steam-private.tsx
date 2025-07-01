import { useUserStore } from "@/stores/auth/user.store";
import { type ReactNode } from "react";
import { Link } from "react-router-dom";

export default function SteamPrivate({ children }: { children: ReactNode }) {
  const { user } = useUserStore();

  if (!user?.steam_id) {
    return (
      <div className="relative">
        <Link className="absolute left-0 top-0 w-full h-full z-10" to="/auth"></Link>
        {children}
      </div>
    );
  }

  return children;
}
