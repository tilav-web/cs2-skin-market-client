import type { ISkin } from "./skin.interface";
import type { IUser } from "./user.interface";

export type TransactionType =
  | 'deposit'      // Pul tashlash
  | 'withdraw'     // Pul yechish
  | 'trade'         // Skin savdosi (sotish/sotib olish)
  | 'bonus';        // Bonus yoki reklama mablag'lari

export enum TransactionState {
  Paid = 2,
  Pending = 1,
  PendingCanceled = -1,
  PaidCanceled = -2,
}

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