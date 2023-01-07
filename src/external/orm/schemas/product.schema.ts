import { Product } from '@entities/product';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductEntity>;

@Schema()
export class ProductEntity implements Product {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  category: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: false, type: Number })
  promotionPercent: number;

  @Prop({ required: true, type: Number })
  spotPrice: number;

  @Prop({ required: true, type: Number })
  forwardPrice: number;

  @Prop({ required: false, type: Number })
  maxInstallmentsInterestFree: number;

  @Prop({ required: true, type: String })
  collectionName: string;

  @Prop({ required: true, type: String })
  origin: string;

  @Prop({ required: false, type: String })
  resources: string;

  @Prop({ required: true, type: String })
  sellerUserId: string;

  @Prop({ required: true, type: String })
  sellerUserEmail: string;

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: true, type: Number })
  rarity: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
