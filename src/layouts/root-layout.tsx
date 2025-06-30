import Footer from "@/components/common/footer/footer";
import Header from "@/components/common/header/header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <Header />
      <main className="p-4 py-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
