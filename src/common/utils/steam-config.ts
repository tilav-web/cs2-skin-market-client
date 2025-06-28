export const STEAM_CONFIG = {
  // Steam OpenID configuration
  STEAM_OPENID_URL: 'https://steamcommunity.com/openid/login',
  STEAM_API_URL: 'https://api.steampowered.com',
  
  // Your Steam API key (you'll need to get this from Steam)
  STEAM_API_KEY: import.meta.env.VITE_STEAM_API_KEY || '',
  
  // Your application's return URL after Steam authentication
  RETURN_URL: import.meta.env.VITE_RETURN_URL || 'http://localhost:5173/auth/callback',
  
  // Steam OpenID parameters
  OPENID_PARAMS: {
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': import.meta.env.VITE_RETURN_URL || 'http://localhost:5173/auth/callback',
    'openid.realm': import.meta.env.VITE_REALM_URL || 'http://localhost:5173',
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select'
  },

  // CS2 Inventory API endpoints
  CS2_INVENTORY_URL: 'https://steamcommunity.com/inventory',
  CS2_APP_ID: '730', // CS2 app ID
  CS2_CONTEXT_ID: '2', // CS2 context ID for skins
};

// Steam user data interface
export interface SteamUserData {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number;
  communityvisibilitystate: number;
  profilestate: number;
  lastlogoff: number;
  commentpermission: number;
  realname?: string;
  primaryclanid?: string;
  timecreated?: number;
  gameid?: string;
  gameserverip?: string;
  gameextrainfo?: string;
  cityid?: number;
  loccountrycode?: string;
  locstatecode?: string;
  loccityid?: number;
}

// Steam authentication response interface
export interface SteamAuthResponse {
  success: boolean;
  user?: SteamUserData;
  error?: string;
}

// Steam token interface for database storage
export interface SteamToken {
  steamId: string;
  token: string;
  expiresAt: number;
  createdAt: number;
}

// CS2 Skin interface
export interface CS2Skin {
  assetid: string;
  classid: string;
  instanceid: string;
  amount: string;
  market_hash_name: string;
  market_name: string;
  name: string;
  marketable: number;
  tradable: number;
  commodity: number;
  market_tradable_restriction: string;
  icon_url: string;
  icon_url_large: string;
  type: string;
  market_name_color: string;
  background_color: string;
  descriptions: Array<{
    type: string;
    value: string;
    color?: string;
  }>;
  owner_descriptions: Array<{
    type: string;
    value: string;
    color?: string;
  }>;
  actions: Array<{
    name: string;
    link: string;
  }>;
  market_actions: Array<{
    name: string;
    link: string;
  }>;
  tags: Array<{
    category: string;
    internal_name: string;
    localized_category_name: string;
    localized_tag_name: string;
    color?: string;
  }>;
  name_color: string;
}

// CS2 Inventory response interface
export interface CS2InventoryResponse {
  success: boolean;
  assets?: CS2Skin[];
  error?: string;
} 