export type TransactionType =
  | 'deposit'      // Pul tashlash
  | 'withdraw'     // Pul yechish
  | 'sale'         // Skin sotish
  | 'bonus'        // Bonus yoki reklama mablag'lari
  | 'buy';         // Skin sotib olish

export interface ITransaction {
  _id: string;
  user: string; // user id
  amount: number;
  type: TransactionType;
  status: 'pending' | 'completed' | 'failed';
  skin?: {
    name: string;
    wear: string;
    image: string;
    rarity: string;
    statTrak: boolean;
    weapon: string;
  } | null;
  createdAt: string;
  updatedAt: string;
} 