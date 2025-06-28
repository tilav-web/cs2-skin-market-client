import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaSteam } from "react-icons/fa";
export default function Auth() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-950">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>CS2 Skin Market</CardTitle>
          <CardDescription>
            Steam hisobingiz bilan tizimga kiring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full text-lg font-bold cursor-pointer">
            <FaSteam className="mr-2 h-5 w-5" />
            Steam bilan kirish
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
