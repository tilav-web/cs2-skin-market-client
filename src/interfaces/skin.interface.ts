export interface ISkin {
  assetid: string; // Skinning noyob ID'si (trade qilish uchun kerak)
  classid: string; // Skin model turi
  instanceid: string; // Skin versiyasi (StatTrak, Souvenir va h.k.)
  market_hash_name: string; // Skinning to‘liq nomi (masalan: "AK-47 | Redline (Field-Tested)")
  icon_url: string; // Skin rasmi (SteamCDN dan olinadi)
  tradable: boolean; // Trade qilish mumkinmi
  wear?: number; // Skin float (agar mavjud bo‘lsa
}