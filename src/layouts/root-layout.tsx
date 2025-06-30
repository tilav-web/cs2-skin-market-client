import Footer from "@/components/common/footer/footer";
import type { IUser } from "@/interfaces/user.interface";
import { useUserStore } from "@/stores/auth/user.store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

// This is a mock user. In a real app, you'd fetch this from an API
// or get it from the Telegram Web App SDK.
const MOCK_USER: IUser = {
  telegram_id: '123456789',
  personaname: 'Test User',
  balance: 1000,
  photo: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  steam_id: '76561198000000000',
  phone: '',
  steam_token: '',
  token_expires_at: new Date(),
  action: '',
  status: 'active',
}


export default function RootLayout() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // Simulate loading user data when the app starts
    setUser(MOCK_USER);
  }, [setUser])

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 container mx-auto p-4 pt-20 pb-20 overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
