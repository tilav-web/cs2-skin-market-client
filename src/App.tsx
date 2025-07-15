import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}