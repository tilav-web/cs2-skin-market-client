export interface IUser {
  steam_id?: string;
  phone?: string;
  photo?: string;
  telegram_id: string;
  personaname?: string;
  steam_token?: string;
  token_expires_at?: Date;
  action?: string;
  status: 'active' | 'not_active' | 'block';
  balance: number;
}
