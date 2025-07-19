import type { ISkin } from "./skin.interface";
import type { IUser } from "./user.interface";
import { TransactionState } from './transaction-state.enum';

export type TransactionType =
  | 'deposit'      // Pul tashlash
  | 'withdraw'     // Pul yechish
  | 'trade'         // Skin savdosi (sotish/sotib olish)
  | 'bonus';        // Bonus yoki reklama mablag'lari

export interface ITransaction {
  _id: string;
  user: IUser; // user id
  receiver?: IUser; // receiver id
  amount: number;
  type: TransactionType;
  state: TransactionState;
  skin?: ISkin | null;
  createdAt: string;
  updatedAt: string;
} 