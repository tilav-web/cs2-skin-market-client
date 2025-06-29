type WebAppUser = {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    is_premium: boolean;
    photo_url: string;
  };
  
  type WebappData = {
    user: WebAppUser;
  };
  
  type TelegramWebapp = {
    initData: string;
    initDataUnsafe: WebappData;
    version: string;
    platform: string;
    expand: () => void;
    close: () => void;
    sendData: (data: string) => void;
    openInvoice: (
      url: string,
      callback?: (status: "paid" | "cancelled" | "failed" | "pending") => void
    ) => void;
  };
  
  interface Window {
    Telegram?: {
      WebApp: TelegramWebapp;
    };
  }