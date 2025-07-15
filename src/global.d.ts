interface WebAppUser {
  id: number; // Telegram chat_id (majburiy)
  is_bot?: boolean; // Bot ekanligi (ixtiyoriy, odatda false)
  first_name: string; // Foydalanuvchi ismi (majburiy)
  last_name?: string; // Foydalanuvchi familiyasi (ixtiyoriy)
  username?: string; // Telegram username (ixtiyoriy)
  language_code?: string; // Til kodi (masalan, "en", "uz")
  is_premium?: boolean; // Premium foydalanuvchi holati (ixtiyoriy)
  photo_url?: string; // Profil rasmi URL (ixtiyoriy)
  allows_write_to_pm?: boolean; // Botga shaxsiy xabar yozishga ruxsat (ixtiyoriy)
}

interface WebAppChat {
  id: number; // Chat ID
  type: string; // Chat turi (masalan, "private", "group", "channel")
  title?: string; // Chat nomi (guruh yoki kanal uchun)
  username?: string; // Chat username (ixtiyoriy)
  photo_url?: string; // Chat rasmi URL (ixtiyoriy)
}

interface WebAppData {
  user?: WebAppUser; // Foydalanuvchi ma'lumotlari (ixtiyoriy)
  query_id?: string; // Web App so‘rov ID si
  receiver?: WebAppUser; // Xabar qabul qiluvchi foydalanuvchi (ixtiyoriy)
  chat?: WebAppChat; // Chat ma'lumotlari (ixtiyoriy)
  auth_date: number; // Autentifikatsiya sanasi (Unix timestamp)
  hash: string; // Ma'lumotlarning xavfsizlik xeshi
  start_param?: string; // Yangi: start_param
}

interface MainButton {
  text: string; // Tugma matni
  color: string; // Tugma rangi
  textColor: string; // Matn rangi
  isVisible: boolean; // Tugma ko‘rinadimi
  isActive: boolean; // Tugma faolmi
  isProgressVisible: boolean; // Yuklanish holati ko‘rinadimi
  setText: (text: string) => void; // Tugma matnini o‘zgartirish
  setParams: (params: {
    text?: string;
    color?: string;
    text_color?: string;
    is_active?: boolean;
    is_visible?: boolean;
  }) => void; // Tugma parametrlarini o‘zgartirish
  show: () => void; // Tugmani ko‘rsatish
  hide: () => void; // Tugmani yashirish
  enable: () => void; // Tugmani faollashtirish
  disable: () => void; // Tugmani o‘chirish
  showProgress: (leaveActive?: boolean) => void; // Yuklanish animatsiyasini ko‘rsatish
  hideProgress: () => void; // Yuklanish animatsiyasini yashirish
  onClick: (callback: () => void) => void; // Tugma bosilganda ishlaydigan funksiya
}

interface HapticFeedback {
  impactOccurred: (style: 'light' | 'medium' | 'heavy') => void; // Vibratsiya effekti
  notificationOccurred: (type: 'error' | 'success' | 'warning') => void; // Bildirishnoma effekti
  selectionChanged: () => void; // Tanlov o‘zgarishi effekti
}

interface BackButton {
  isVisible: boolean;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
  show: () => void;
  hide: () => void;
}

interface TelegramWebApp {
  initData: string; // Xavfsiz autentifikatsiya ma'lumotlari
  initDataUnsafe: WebAppData; // Xavfsiz bo‘lmagan ma'lumotlar obyekti
  version: string; // Web App versiyasi
  platform: string; // Platforma (masalan, "ios", "android", "web")
  colorScheme: 'light' | 'dark'; // Rang sxemasi
  themeParams: Record<string, string>; // Mavzu sozlamalari (masalan, bg_color, text_color)
  isExpanded: boolean; // Ilova to‘liq ekran rejimidami
  viewportHeight: number; // Joriy viewport balandligi
  viewportStableHeight: number; // Klaviatura ochilganda barqaror balandlik
  isClosingConfirmationEnabled: boolean; // Ilovani yopish tasdiqlash yoqilganmi
  MainButton: MainButton; // Asosiy tugma obyekti
  HapticFeedback: HapticFeedback; // Vibratsiya effekti obyekti
  BackButton: BackButton; // Orqaga qaytish tugmasi obyekti
  requestFullscreen: () => void; // Ilovani to‘liq ekran rejimida ochish
  lockOrientation: (orientation?: 'portrait' | 'landscape') => void; //
  expand: () => void; // Ilovani to‘liq ekran rejimida ochish
  close: () => void; // Ilovani yopish
  sendData: (data: string) => void; // Botga ma'lumot yuborish
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void; // Havolani ochish
  openTelegramLink: (url: string) => void; // Telegram ichidagi havolani ochish
  openInvoice: (
    url: string,
    callback?: (status: 'paid' | 'cancelled' | 'failed' | 'pending') => void,
  ) => void; // To‘lov oynasini ochish
  showPopup: (
    params: {
      title?: string;
      message: string;
      buttons: Array<{ type: 'default' | 'ok' | 'cancel' | 'destructive'; text: string; id?: string }>;
    },
    callback?: (id: string) => void,
  ) => void; // Popup oynasini ko‘rsatish
  showAlert: (message: string, callback?: () => void) => void; // Oddiy ogohlantirish oynasi
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void; // Tasdiqlash oynasi
  enableClosingConfirmation: () => void; // Yopish tasdiqlashni yoqish
  disableClosingConfirmation: () => void; // Yopish tasdiqlashni o‘chirish
  onEvent: (
    eventType: 'viewportChanged' | 'themeChanged' | 'mainButtonClicked' | 'backButtonClicked',
    callback: (data?: { isStateStable?: boolean }) => void,
  ) => void; // Hodisalarni kuzatish
  offEvent: (
    eventType: 'viewportChanged' | 'themeChanged' | 'mainButtonClicked' | 'backButtonClicked',
    callback: (data?: { isStateStable?: boolean }) => void,
  ) => void; // Hodisani o‘chirish
  ready: () => void; // Ilova tayyor ekanligini bildirish
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}