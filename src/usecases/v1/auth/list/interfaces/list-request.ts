export interface ProductRequest {
  category?: string;
  inPromotion?: boolean;
  promotionPercentMin?: number;
  spotPriceMax?: number;
  spotPriceMin?: number;
  forwardPriceMax?: number;
  forwardPriceMin?: number;
  maxInstallmentsInterestFreeMin?: number;
  collectionName?: string;
  origin?: string;
  haveResources?: boolean;
  itemsPerPage?: number;
  page?: number;
}
