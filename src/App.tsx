import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import { ThemeProvider } from "./components/theme-provider";
import Auth from "./pages/auth/auth";
import AuthLayout from "./layouts/auth-layout";
import MainPage from "./pages/main/main";
import Profile from "./pages/profile/profile";
import Skins from "./pages/skins/skins";
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
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      console.log(
        "WebApp expanded. Stable viewport height:",
        window.Telegram.WebApp.viewportStableHeight
      );
    } else {
      console.error("Telegram Web App SDK not loaded");
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
