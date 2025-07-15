import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom"; // useNavigate ni import qilamiz
import RootLayout from "./layouts/root-layout";
import { ThemeProvider } from "./components/theme-provider";
import Auth from "./pages/auth/auth";
import MainPage from "./pages/main/main";
import Profile from "./pages/profile/profile";
import Skins from "./pages/skins/skins";
import Referrals from "./pages/referrals/referrals";
import BuySkinPage from "./pages/skins/buy";
import { DepositPage } from "./pages/profile/deposit";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useUserStore } from "./stores/auth/user.store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/skins",
        element: <Skins />,
      },
      {
        path: "/referrals",
        element: <Referrals />,
      },
      {
        path: "/skins/buy/:id",
        element: <BuySkinPage />,
      },
      {
        path: "/profile/deposit",
        element: <DepositPage />,
      },
      {
        path: '/auth',
        element: <Auth />,
      }
    ],
  }
]);

export default function App() {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const navigate = useNavigate(); // useNavigate hookini olamiz

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.requestFullscreen();
      window.Telegram.WebApp.lockOrientation();

      // start_param ni tekshirish
      const startParam = window.Telegram.WebApp.initDataUnsafe.start_param;
      if (startParam && startParam.startsWith('skins_buy_')) {
        const skinId = startParam.replace('skins_buy_', '');
        navigate(`/skins/buy/${skinId}`);
      }
    }
  }, [navigate]); // navigate ni dependency qilib qo'shamiz

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
