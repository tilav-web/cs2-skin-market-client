export interface ISkin {
  id: number;
  name: string; // Skin nomi (masalan, "AK-47 | Redline")
  wear: string; // Sifat (masalan, "Factory New")
  image: string; // Skin rasmi URL
  rarity: string; // Nadirlik darajasi (masalan, "Covert")
  statTrak: boolean; // StatTrak™ holati
  weapon: string; // Qurol turi (masalan, "AK-47")
  price: number; // Skinning bozor narxi (USD yoki boshqa valyutada)
}
