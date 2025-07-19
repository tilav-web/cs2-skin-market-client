export interface IUser {
  _id: string;
  steam_id?: string;
  phone?: string;
  photo?: string;
  telegram_id: string;
  personaname?: string;
  trade_url?: { value: string; status: boolean; };
  action?: string;
  status: "active" | "not_active" | "block";
  balance: number;
  cashback: number;
}
