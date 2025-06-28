import { STEAM_CONFIG } from './steam-config';
import type { SteamUserData, SteamAuthResponse, SteamToken, CS2InventoryResponse } from './steam-config';
import { toastError, toastSuccess } from './toast-action.ts';

// Initialize Steam login
export const initiateSteamLogin = (): void => {
  try {
    // Build the Steam OpenID URL with parameters
    const params = new URLSearchParams(STEAM_CONFIG.OPENID_PARAMS);
    const steamLoginUrl = `${STEAM_CONFIG.STEAM_OPENID_URL}?${params.toString()}`;
    
    console.log('🚀 Initiating Steam login...');
    console.log('📍 Redirecting to:', steamLoginUrl);
    
    // Redirect to Steam login
    window.location.href = steamLoginUrl;
  } catch (error) {
    console.error('❌ Error initiating Steam login:', error);
    toastError('Steam login boshlashda xatolik yuz berdi');
  }
};

// Process Steam authentication callback
export const processSteamCallback = async (): Promise<SteamAuthResponse> => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const openidParams = Object.fromEntries(urlParams.entries());
    
    console.log('📥 Steam callback received');
    console.log('📋 OpenID parameters:', openidParams);
    
    // Check if we have the required OpenID parameters
    if (!openidParams['openid.claimed_id'] || !openidParams['openid.sig']) {
      throw new Error('OpenID parameters not found');
    }
    
    // Extract Steam ID from the claimed_id
    const claimedId = openidParams['openid.claimed_id'];
    const steamId = claimedId.replace('https://steamcommunity.com/openid/id/', '');
    
    console.log('🆔 Steam ID extracted:', steamId);
    
    // Fetch user data from Steam API
    const userData = await fetchSteamUserData(steamId);
    
    if (userData) {
      console.log('✅ Steam user data fetched successfully');
      console.log('👤 User data:', userData);
      
      toastSuccess('Steam bilan muvaffaqiyatli kirildi!');
      
      return {
        success: true,
        user: userData
      };
    } else {
      throw new Error('Failed to fetch user data');
    }
    
  } catch (error) {
    console.error('❌ Error processing Steam callback:', error);
    toastError('Steam autentifikatsiyada xatolik yuz berdi');
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Fetch user data from Steam API
export const fetchSteamUserData = async (steamId: string): Promise<SteamUserData | null> => {
  try {
    if (!STEAM_CONFIG.STEAM_API_KEY) {
      console.warn('⚠️ Steam API key not configured');
      return null;
    }
    
    const url = `${STEAM_CONFIG.STEAM_API_URL}/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_CONFIG.STEAM_API_KEY}&steamids=${steamId}`;
    
    console.log('🔍 Fetching Steam user data...');
    console.log('🌐 API URL:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('📊 Steam API response:', data);
    
    if (data.response && data.response.players && data.response.players.length > 0) {
      return data.response.players[0];
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error fetching Steam user data:', error);
    return null;
  }
};

// Check if current URL is a Steam callback
export const isSteamCallback = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('openid.claimed_id') || urlParams.has('openid.sig');
};

// Clear URL parameters after processing
export const clearUrlParameters = (): void => {
  if (window.history.replaceState) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

// Save user data to localStorage
export const saveSteamUserData = (userData: SteamUserData): void => {
  try {
    localStorage.setItem('steam_user_data', JSON.stringify(userData));
    localStorage.setItem('steam_login_time', Date.now().toString());
    console.log('💾 User data saved to localStorage');
  } catch (error) {
    console.error('❌ Error saving user data:', error);
  }
};

// Get user data from localStorage
export const getSteamUserData = (): SteamUserData | null => {
  try {
    const userData = localStorage.getItem('steam_user_data');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('❌ Error getting user data:', error);
    return null;
  }
};

// Check if user is logged in
export const isSteamLoggedIn = (): boolean => {
  const userData = getSteamUserData();
  const loginTime = localStorage.getItem('steam_login_time');
  
  if (!userData || !loginTime) {
    return false;
  }
  
  // Check if login is not older than 24 hours
  const loginTimestamp = parseInt(loginTime);
  const currentTime = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  
  return (currentTime - loginTimestamp) < twentyFourHours;
};

// Logout user
export const logoutSteamUser = (): void => {
  localStorage.removeItem('steam_user_data');
  localStorage.removeItem('steam_login_time');
  console.log('🚪 User logged out');
  toastSuccess('Tizimdan chiqildi');
};

// Save Steam token to localStorage (for demo purposes, in real app save to database)
export const saveSteamToken = (steamId: string, token: string): void => {
  try {
    const steamToken: SteamToken = {
      steamId,
      token,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      createdAt: Date.now()
    };
    
    localStorage.setItem('steam_token', JSON.stringify(steamToken));
    console.log('💾 Steam token saved:', steamToken);
  } catch (error) {
    console.error('❌ Error saving Steam token:', error);
  }
};

// Get Steam token from localStorage
export const getSteamToken = (): SteamToken | null => {
  try {
    const tokenData = localStorage.getItem('steam_token');
    if (!tokenData) return null;
    
    const token: SteamToken = JSON.parse(tokenData);
    
    // Check if token is expired
    if (Date.now() > token.expiresAt) {
      localStorage.removeItem('steam_token');
      console.log('⏰ Steam token expired');
      return null;
    }
    
    return token;
  } catch (error) {
    console.error('❌ Error getting Steam token:', error);
    return null;
  }
};

// Fetch CS2 inventory using Steam token
export const fetchCS2Inventory = async (steamId: string): Promise<CS2InventoryResponse> => {
  try {
    const token = getSteamToken();
    if (!token) {
      throw new Error('Steam token not found or expired');
    }
    
    console.log('🔍 Fetching CS2 inventory for Steam ID:', steamId);
    
    const url = `${STEAM_CONFIG.CS2_INVENTORY_URL}/${steamId}/${STEAM_CONFIG.CS2_APP_ID}/${STEAM_CONFIG.CS2_CONTEXT_ID}`;
    
    console.log('🌐 CS2 Inventory URL:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('📊 CS2 Inventory response:', data);
    
    if (data.success && data.assets) {
      // Filter only CS2 skins (weapons, knives, gloves, etc.)
      const cs2Skins = data.assets.filter((asset: { descriptions?: Array<{ value: string }> }) => {
        const descriptions = asset.descriptions || [];
        return descriptions.some((desc: { value: string }) => 
          desc.value && (
            desc.value.includes('Weapon') ||
            desc.value.includes('Knife') ||
            desc.value.includes('Gloves') ||
            desc.value.includes('Music Kit') ||
            desc.value.includes('Agent') ||
            desc.value.includes('Patch') ||
            desc.value.includes('Sticker')
          )
        );
      });
      
      console.log('🎮 CS2 Skins found:', cs2Skins.length);
      console.log('🎨 CS2 Skins:', cs2Skins);
      
      return {
        success: true,
        assets: cs2Skins
      };
    } else {
      throw new Error('Failed to fetch CS2 inventory');
    }
    
  } catch (error) {
    console.error('❌ Error fetching CS2 inventory:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Process Steam authentication callback with token storage
export const processSteamCallbackWithToken = async (): Promise<SteamAuthResponse> => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const openidParams = Object.fromEntries(urlParams.entries());
    
    console.log('📥 Steam callback received');
    console.log('📋 OpenID parameters:', openidParams);
    
    // Check if we have the required OpenID parameters
    if (!openidParams['openid.claimed_id'] || !openidParams['openid.sig']) {
      throw new Error('OpenID parameters not found');
    }
    
    // Extract Steam ID from the claimed_id
    const claimedId = openidParams['openid.claimed_id'];
    const steamId = claimedId.replace('https://steamcommunity.com/openid/id/', '');
    
    console.log('🆔 Steam ID extracted:', steamId);
    
    // Generate a simple token (in real app, this would be a proper JWT or session token)
    const token = btoa(`${steamId}:${Date.now()}:${Math.random()}`);
    
    // Save the token
    saveSteamToken(steamId, token);
    
    // Fetch user data from Steam API
    const userData = await fetchSteamUserData(steamId);
    
    if (userData) {
      console.log('✅ Steam login successful with token');
      console.log('👤 User data:', userData);
      console.log('🔑 Token saved for CS2 inventory access');
      
      toastSuccess('Steam bilan muvaffaqiyatli kirildi!');
      
      return {
        success: true,
        user: userData
      };
    } else {
      throw new Error('Failed to fetch user data');
    }
    
  } catch (error) {
    console.error('❌ Error processing Steam callback:', error);
    toastError('Steam autentifikatsiyada xatolik yuz berdi');
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 