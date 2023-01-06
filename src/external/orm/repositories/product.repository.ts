import { Product } from '@entities/product';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductRepositoryPort } from '@usecases/port/product-repository';
import { FindProductOptions } from '@usecases/v1/auth/interfaces/find-product-options';
import { ListProductOptions } from '@usecases/v1/auth/interfaces/list-product-options';
import { ListProductResponse } from '@usecases/v1/auth/interfaces/list-product-response';
import { Model } from 'mongoose';
import { ProductEntity } from '../schemas/product.schema';

@Injectable()
export class ProductRepositoryImpl implements ProductRepositoryPort {
  constructor(
    @InjectModel('Products')
    private productModel: Model<ProductEntity>,
  ) {}

  async findOne(findProductOptions: FindProductOptions): Promise<Product> {
    const { id } = findProductOptions;
    let product: Product;
    if (id) {
      product = await this.productModel.findById(id);
    }
    return product;
  }

  async save(entity: Product): Promise<Product> {
    console.log('product-repository', entity);
    const product: Product = await this.productModel.create(entity);
    return product;
  }

  async find({
    category,
    inPromotion,
    promotionPercentMin,
    spotPriceMax,
    spotPriceMin,
    forwardPriceMax,
    forwardPriceMin,
    maxInstallmentsInterestFreeMin,
    collectionName,
    origin,
    haveResources,
    itemsPerPage,
    page,
  }: ListProductOptions): Promise<ListProductResponse> {
    const products: Product[] = [];

    if (category) {
      products.concat(
        await this.productModel.find({
          category: { $regex: `/${category}/i` },
        }),
      );
    }
    if (collectionName) {
      products.concat(
        await this.productModel.find({
          collectionName: { $regex: `/${collectionName}/i` },
        }),
      );
    }
    if (origin) {
      products.concat(
        await this.productModel.find({
          origin: { $regex: `/${origin}/i` },
        }),
      );
    }

    if (haveResources) {
      products.concat(
        await this.productModel.find().where('resources').ne(null),
      );
    }

    if (inPromotion) {
      products.concat(
        await this.productModel.find().where('inPromotion').equals(true),
      );
    }
    if (promotionPercentMin) {
      products.concat(
        await this.productModel
          .find()
          .where('promotionPercent')
          .gt(promotionPercentMin),
      );
    }
    if (spotPriceMax) {
      products.concat(
        await this.productModel.find().where('spotPrice').lt(spotPriceMax),
      );
    }
    if (spotPriceMin) {
      products.concat(
        await this.productModel.find().where('spotPrice').gt(spotPriceMin),
      );
    }
    if (forwardPriceMax) {
      products.concat(
        await this.productModel
          .find()
          .where('forwardPrice')
          .lt(forwardPriceMax),
      );
    }
    if (forwardPriceMin) {
      products.concat(
        await this.productModel
          .find()
          .where('forwardPrice')
          .gt(forwardPriceMin),
      );
    }
    if (maxInstallmentsInterestFreeMin) {
      products.concat(
        await this.productModel
          .find()
          .where('maxInstallmentsInterestFree')
          .gt(maxInstallmentsInterestFreeMin),
      );
    }

    if (itemsPerPage) {
      const paginatedListOfProduct = this.paginateProducts(
        products,
        itemsPerPage,
      );
      const totalPages = Math.ceil(products.length / itemsPerPage);

      return {
        items: paginatedListOfProduct[page],
        page,
        totalItems: products.length,
        itemsPerPage,
        totalPages,
      };
    }
    return {
      items: products,
      page: 1,
      totalItems: products.length,
      itemsPerPage: products.length,
      totalPages: 1,
    };
  }

  paginateProducts(listProfucts: Product[], sizeOfPage: number) {
    return listProfucts.reduce((acc, val, i) => {
      const idx = Math.floor(i / sizeOfPage);
      const page = acc[idx] || (acc[idx] = []);
      page.push(val);
      return acc;
    }, []);
  }
}
