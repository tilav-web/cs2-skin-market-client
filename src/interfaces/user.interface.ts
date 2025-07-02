export interface IUser {
  steam_id?: string;
  phone?: string;
  photo?: string;
  telegram_id: string;
  personaname?: string;
  trade_url?: string;
  action?: string;
  status: 'active' | 'not_active' | 'block';
  balance: number;
}
