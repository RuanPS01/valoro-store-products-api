export interface ListProductOptions {
  category?: string;
  name?: string;
  inPromotion?: boolean;
  promotionPercentMin?: number;
  spotPriceMax?: number;
  spotPriceMin?: number;
  forwardPriceMax?: number;
  forwardPriceMin?: number;
  maxInstallmentsInterestFreeMin?: number;
  collectionName?: string;
  order?: string;
  referenceOrder?: string;
  origin?: string;
  haveResources?: boolean;
  itemsPerPage?: number;
  sellerUserId?: string;
  sellerUserEmail?: string;
  page?: number;
}
