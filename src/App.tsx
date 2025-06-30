import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import { ThemeProvider } from "./components/theme-provider";
import Auth from "./pages/auth/auth";
import AuthLayout from "./layouts/auth-layout";
import MainPage from "./pages/main/main";
import Profile from "./pages/profile/profile";
import Skins from "./pages/skins/skins";
import Referrals from "./pages/referrals/referrals";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";

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
      }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
    ],
  },
]);

export default function App() {

  useEffect(() => {
    // Initialize Telegram Web App
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.requestFullscreen();
      window.Telegram.WebApp.lockOrientation();
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
