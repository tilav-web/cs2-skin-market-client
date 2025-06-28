import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaSteam } from "react-icons/fa";
import { useEffect, useState } from "react";
import { 
  initiateSteamLogin, 
  processSteamCallbackWithToken, 
  isSteamCallback, 
  clearUrlParameters,
  saveSteamUserData,
  getSteamUserData,
  isSteamLoggedIn,
  logoutSteamUser,
  fetchCS2Inventory,
  getSteamToken
} from "@/common/utils/steam-auth";
import type { SteamUserData, CS2Skin } from "@/common/utils/steam-config";

export default function Auth() {
  const [user, setUser] = useState<SteamUserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cs2Skins, setCs2Skins] = useState<CS2Skin[]>([]);
  const [isLoadingSkins, setIsLoadingSkins] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = getSteamUserData();
    const token = getSteamToken();
    
    if (savedUser && isSteamLoggedIn() && token) {
      setUser(savedUser);
      console.log('👤 User already logged in:', savedUser);
      console.log('🔑 Token available for CS2 inventory access');
      return;
    }

    // Check if this is a Steam callback
    if (isSteamCallback()) {
      handleSteamCallback();
    }
  }, []);

  const handleSteamCallback = async () => {
    setIsLoading(true);
    try {
      const result = await processSteamCallbackWithToken();
      
      if (result.success && result.user) {
        saveSteamUserData(result.user);
        setUser(result.user);
        clearUrlParameters();
        console.log('✅ Steam login successful with token:', result.user);
      } else {
        console.error('❌ Steam login failed:', result.error);
      }
    } catch (error) {
      console.error('❌ Error handling Steam callback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSteamLogin = () => {
    setIsLoading(true);
    console.log('🚀 Starting Steam login process...');
    initiateSteamLogin();
  };

  const handleLogout = () => {
    logoutSteamUser();
    setUser(null);
    setCs2Skins([]);
    console.log('🚪 User logged out');
  };

  const handleFetchCS2Skins = async () => {
    if (!user) return;
    
    setIsLoadingSkins(true);
    try {
      console.log('🎮 Fetching CS2 skins for user:', user.personaname);
      
      const result = await fetchCS2Inventory(user.steamid);
      
      if (result.success && result.assets) {
        setCs2Skins(result.assets);
        console.log('✅ CS2 skins fetched successfully:', result.assets.length, 'items');
      } else {
        console.error('❌ Failed to fetch CS2 skins:', result.error);
      }
    } catch (error) {
      console.error('❌ Error fetching CS2 skins:', error);
    } finally {
      setIsLoadingSkins(false);
    }
  };

  // If user is logged in, show user info and CS2 skins
  if (user) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-950 p-4">
        <Card className="w-[500px] max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <CardTitle>CS2 Skin Market</CardTitle>
            <CardDescription>
              Xush kelibsiz, {user.personaname}!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <img 
                src={user.avatarfull} 
                alt={user.personaname}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg">{user.personaname}</h3>
                <p className="text-sm text-gray-500">Steam ID: {user.steamid}</p>
                {user.realname && (
                  <p className="text-sm text-gray-500">Real name: {user.realname}</p>
                )}
              </div>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button 
                onClick={handleFetchCS2Skins}
                disabled={isLoadingSkins}
                className="w-full"
              >
                {isLoadingSkins ? 'Yuklanmoqda...' : 'CS2 Skinlarini olish'}
              </Button>
              
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="w-full"
              >
                Chiqish
              </Button>
            </div>

            {/* CS2 Skins Display */}
            {cs2Skins.length > 0 && (
              <div className="pt-4">
                <h4 className="font-semibold mb-3">CS2 Skinlari ({cs2Skins.length})</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {cs2Skins.map((skin, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-gray-800 rounded">
                      <img 
                        src={`https://community.cloudflare.steamstatic.com/economy/image/${skin.icon_url}`}
                        alt={skin.name}
                        className="w-8 h-8"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{skin.name}</p>
                        <p className="text-xs text-gray-500">{skin.market_hash_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show login form
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
          <Button 
            onClick={handleSteamLogin}
            disabled={isLoading}
            className="w-full text-lg font-bold cursor-pointer"
          >
            <FaSteam className="mr-2 h-5 w-5" />
            {isLoading ? 'Yuklanmoqda...' : 'Steam bilan kirish'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
