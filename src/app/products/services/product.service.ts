import { Injectable } from '@angular/core';
import { Product, Category, ProductModel } from 'src/app/shared';
import { ProductsServiceModule } from '../products-service.module';

const productList: Array<Product> = [
  new ProductModel(
    'MYSHOES',
    'Black Running Shoes',
    Category.Durable,
    71,
    109.99,
    'Best shoes ever'
  ),
];

const productListPromise = Promise.resolve(productList);

@Injectable({
  providedIn: ProductsServiceModule
})
export class ProductService {

  public getProducts(): Promise<Array<Product>> {
    return productListPromise;
  }

  public getProduct(sku: string): Promise<Product> {
    return this.getProducts()
              .then( list => list.find(p => p.sku === sku ) )
              .catch(() => Promise.reject('Error when getting product ' + sku));
  }

  public updateProduct(product: Product): void {
    console.log('updated: ' + product.sku);
    const i = productList.findIndex(p => p.sku === product.sku);
    if (i > -1) {
      productList.splice(i, 1, product);
    }
  }

  public createProduct(product: Product): void {
    console.log('created: ' + product.sku);
    productList.push(product);
  }
}
