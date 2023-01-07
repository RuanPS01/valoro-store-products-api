import { Product } from '@entities/product';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductRepositoryPort } from '@usecases/port/product-repository';
import { FindProductOptions } from '@usecases/v1/products/interfaces/find-product-options';
import { ListProductOptions } from '@usecases/v1/products/interfaces/list-product-options';
import { ListProductResponse } from '@usecases/v1/products/interfaces/list-product-response';
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
    const product: Product = await this.productModel.create(entity);
    return product;
  }

  async find(
    findListProductsOptions: ListProductOptions,
  ): Promise<ListProductResponse> {
    const {
      category,
      name,
      inPromotion,
      promotionPercentMin,
      spotPriceMax,
      spotPriceMin,
      forwardPriceMax,
      forwardPriceMin,
      maxInstallmentsInterestFreeMin,
      collectionName,
      order,
      referenceOrder,
      origin,
      haveResources,
      itemsPerPage,
      sellerUserId,
      sellerUserEmail,
      page,
    } = findListProductsOptions;
    let products;

    console.log('findListProductsOptions ', findListProductsOptions);

    if (category) {
      products = await this.productModel
        .find()
        .where('category')
        .equals(category)
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });
    }

    if (name) {
      products = await this.productModel.find().where('name').equals(name);
    }

    if (collectionName) {
      products = await this.productModel
        .find()
        .where('collectionName')
        .equals(collectionName)
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });
    }
    if (origin) {
      products = await this.productModel
        .find()
        .where('collectionName')
        .equals(collectionName)
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });
    }

    if (haveResources) {
      products = await this.productModel.find().where('resources').ne(null);
    }

    if (sellerUserId) {
      products = await this.productModel
        .find()
        .where('sellerUserId')
        .equals(sellerUserId)
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });
    }

    if (sellerUserEmail) {
      products = await this.productModel
        .find()
        .where('sellerUserId')
        .equals(sellerUserId)
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });
    }

    if (inPromotion) {
      products = await this.productModel.find().where('promotionPercent').gt(0);
    }
    if (promotionPercentMin) {
      products = await this.productModel
        .find()
        .where('promotionPercent')
        .gt(promotionPercentMin)
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });
    }
    if (spotPriceMax) {
      products = await this.productModel
        .find()
        .where('spotPrice')
        .lt(spotPriceMax)
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });
    }
    if (spotPriceMin) {
      products = await this.productModel
        .find()
        .where('spotPrice')
        .gt(spotPriceMin)
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });
    }
    if (forwardPriceMax) {
      products = await this.productModel
        .find()
        .where('forwardPrice')
        .lt(forwardPriceMax)
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });
    }
    if (forwardPriceMin) {
      products = await this.productModel
        .find()
        .where('forwardPrice')
        .gt(forwardPriceMin)
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });
    }
    if (maxInstallmentsInterestFreeMin) {
      products = await this.productModel
        .find()
        .where('maxInstallmentsInterestFree')
        .gt(maxInstallmentsInterestFreeMin)
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });
    }

    if (!products)
      products = await this.productModel
        .find()
        .sort({ [referenceOrder]: order === 'asc' ? 1 : -1 });

    if (itemsPerPage && page && products) {
      const paginatedListOfProduct = this.paginateProducts(
        products,
        itemsPerPage,
      );
      const totalPages = Math.ceil(products.length / itemsPerPage);

      return {
        items: paginatedListOfProduct[page - 1],
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
