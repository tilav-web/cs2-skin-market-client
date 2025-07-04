import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import { ThemeProvider } from "./components/theme-provider";
import Auth from "./pages/auth/auth";
import MainPage from "./pages/main/main";
import Profile from "./pages/profile/profile";
import Skins from "./pages/skins/skins";
import Referrals from "./pages/referrals/referrals";
import BuySkinPage from "./pages/skins/buy";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useUserStore } from "./stores/auth/user.store";
import { userService } from "./services/user.service";

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
        path: "/skins/buy/:assetid",
        element: <BuySkinPage />,
      },
      {
        path: '/auth',
        element: <Auth />,
      }
    ],
  }
]);

export default function App() {
  const { setUser, user } = useUserStore()
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.requestFullscreen();
      window.Telegram.WebApp.lockOrientation();
    }
  }, []);

  useEffect(() => {
    (async () => {
      if(!user) {
        const data = await userService.findMe()
        setUser(data)
      }
    })()
  }, [setUser])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
