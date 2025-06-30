import Footer from "@/components/common/footer/footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 container mx-auto p-4 pt-20 pb-20 overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
