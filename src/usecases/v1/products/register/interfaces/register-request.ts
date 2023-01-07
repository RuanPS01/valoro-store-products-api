export interface RegisterRequest {
  sellerUserId: string;
  sellerUserEmail: string;
  category: string;
  name: string;
  promotionPercent?: number;
  spotPrice: number;
  forwardPrice: number;
  maxInstallmentsInterestFree: number;
  collectionName: string;
  origin: string;
  rarity: number;
  resources?: string;
  image: string;
}
