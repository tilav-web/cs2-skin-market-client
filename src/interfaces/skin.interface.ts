export interface ISkin {
  _id: string;
  assetid: string;
  classid: string;
  instanceid: string;
  market_hash_name: string;
  icon_url: string;
  tradable: boolean;
  price: number;
  user: string;
  advertising: boolean;
  status: "available" | "pending" | "sold" | "canceled";
  buyer: string | null;
  message_id: string | null;
  publish_at: Date | null;
  expires_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
