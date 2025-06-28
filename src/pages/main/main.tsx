import { SkinCard } from "@/components/common/skin-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ISkin } from "@/interfaces/skin.interface";


const ownedSkins: ISkin[] = [
  {
    id: 1,
    weapon: "AK-47",
    skinName: "Redline",
    price: "1550",
    image:
      "https://cdn.csgoskins.gg/public/uih/weapons/aHR0cHM6Ly9jZG4uY3Nnb3NraW5zLmdnL3B1YmxpYy9pbWFnZXMvYnVja2V0cy9lY29uL3dlYXBvbnMvYmFzZV93ZWFwb25zL3dlYXBvbl9hazQ3LmQwMGQxZGZhMDk2MjFjMjk3Njk2ZTM1M2Y0MTMzMzBjOTRlZDUwOTAucG5n/auto/auto/85/notrim/06be7f9eb59aeebc19509c82a43a82b5.webp",
    rarity: "Classified",
    wear: "Field-Tested",
    statTrak: false,
  },
];

const soldSkins: ISkin[] = [
  {
    id: 2,
    weapon: "AWP",
    skinName: "Asiimov",
    price: "7500",
    image:
      "https://cdn.csgoskins.gg/public/uih/weapons/aHR0cHM6Ly9jZG4uY3Nnb3NraW5zLmdnL3B1YmxpYy9pbWFnZXMvYnVja2V0cy9lY29uL3dlYXBvbnMvYmFzZV93ZWFwb25zL3dlYXBvbl9hazQ3LmQwMGQxZGZhMDk2MjFjMjk3Njk2ZTM1M2Y0MTMzMzBjOTRlZDUwOTAucG5n/auto/auto/85/notrim/06be7f9eb59aeebc19509c82a43a82b5.webp",
    rarity: "Covert",
    wear: "Battle-Scarred",
    statTrak: false,
  },
];

const boughtSkins: ISkin[] = [
  {
    id: 3,
    weapon: "StatTrak™ M4A4",
    skinName: "Howl",
    price: "350000",
    image:
      "https://cdn.csgoskins.gg/public/uih/weapons/aHR0cHM6Ly9jZG4uY3Nnb3NraW5zLmdnL3B1YmxpYy9pbWFnZXMvYnVja2V0cy9lY29uL3dlYXBvbnMvYmFzZV93ZWFwb25zL3dlYXBvbl9hazQ3LmQwMGQxZGZhMDk2MjFjMjk3Njk2ZTM1M2Y0MTMzMzBjOTRlZDUwOTAucG5n/auto/auto/85/notrim/06be7f9eb59aeebc19509c82a43a82b5.webp",
    rarity: "Contraband",
    wear: "Factory New",
    statTrak: true,
  },
  {
    id: 4,
    weapon: "Glock-18",
    skinName: "Fade",
    price: "1200000000",
    image:
      "https://cdn.csgoskins.gg/public/uih/weapons/aHR0cHM6Ly9jZG4uY3Nnb3NraW5zLmdnL3B1YmxpYy9pbWFnZXMvYnVja2V0cy9lY29uL3dlYXBvbnMvYmFzZV93ZWFwb25zL3dlYXBvbl9hazQ3LmQwMGQxZGZhMDk2MjFjMjk3Njk2ZTM1M2Y0MTMzMzBjOTRlZDUwOTAucG5n/auto/auto/85/notrim/06be7f9eb59aeebc19509c82a43a82b5.webp",
    rarity: "Mil-Spec",
    wear: "Minimal Wear",
    statTrak: false,
  },
];

export default function MainPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Skins Market</h1>
      <Tabs defaultValue="owned">
        <TabsList>
          <TabsTrigger value="owned">skins</TabsTrigger>
          <TabsTrigger value="sold">sold skins</TabsTrigger>
          <TabsTrigger value="bought">bought skins</TabsTrigger>
        </TabsList>
        <TabsContent value="owned">
          <div className="grid grid-cols-2 gap-2">
            {ownedSkins.map((skin) => (
              <SkinCard key={skin.id} skin={skin} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="sold">
          <div className="grid grid-cols-2 gap-2">
            {soldSkins.map((skin) => (
              <SkinCard key={skin.id} skin={skin} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="bought">
          <div className="grid grid-cols-2 gap-2">
            {boughtSkins.map((skin) => (
              <SkinCard key={skin.id} skin={skin} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
