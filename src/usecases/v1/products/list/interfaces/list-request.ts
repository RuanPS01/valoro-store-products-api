export interface ProductRequest {
  category?: string;
  name?: string;
  inPromotion?: boolean;
  promotionPercentMin?: number;
  spotPriceMax?: number;
  spotPriceMin?: number;
  forwardPriceMax?: number;
  forwardPriceMin?: number;
  maxInstallmentsInterestFreeMin?: number;
  sellerUserId?: string;
  sellerUserEmail?: string;
  collectionName?: string;
  order?: string;
  referenceOrder?: string;
  origin?: string;
  haveResources?: boolean;
  itemsPerPage?: number;
  page?: number;
}
