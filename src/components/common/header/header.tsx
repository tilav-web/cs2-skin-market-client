import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { LogOut, User, ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center border-b fixed left-0 w-full dark:bg-black">
      <h1 className="text-xl font-bold">Tilav</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>My Account</SheetTitle>
            <SheetDescription>
              Manage your profile and skins.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 flex flex-col">
            <Link to="/profile">
              <Button variant="ghost" className="w-full justify-start gap-2 py-4">
                <User size={16} /> Profile
              </Button>
            </Link>
            <Link to="/my-skins">
              <Button variant="ghost" className="w-full justify-start gap-2 py-4">
                <ShoppingBag size={16} /> My Skins
              </Button>
            </Link>
            <div className="border-b my-2"></div>
            <Link to="/logout">
              <Button variant="ghost" className="w-full justify-start gap-2 py-4 text-red-500 hover:text-red-600">
                <LogOut size={16} /> Logout
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
} 