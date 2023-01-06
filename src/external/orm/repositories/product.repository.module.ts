import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../schemas/product.schema';
import { ProductRepositoryImpl } from './product.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductSchema }]),
  ],
  providers: [ProductRepositoryImpl],
  exports: [ProductRepositoryImpl],
})
export class ProductRepositoryModule {}
