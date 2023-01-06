import { Types } from 'mongoose';

export interface Product {
  _id?: Types.ObjectId;

  category: string;

  name: string;

  promotionPercent: number;

  spotPrice: number;

  forwardPrice: number;

  maxInstallmentsInterestFree: number;

  collectionName: string;

  origin: string;

  resources?: string;

  image: string;
}
