import { Injectable } from '@angular/core';
import { ProductModel, Category } from 'src/app/shared';
import { ProductsServiceModule } from '../products-service.module';

const productList = [
  new ProductModel( 'MYSHOES', 'Black Running Shoes', Category.Durable, true, 'Best shoes ever', 109.99 ),
  new ProductModel( 'NEATOJACKET', 'Blue Jacket', Category.Durable,  true, '/assets/images/products/blue-jacket.jpg', 238.99 ),
  new ProductModel( 'NICEHAT', 'A Nice Black Hat', Category.Nondurable, false, '/assets/images/products/black-hat.jpg', 29.99 )
];
const productListPromise = Promise.resolve(productList);

@Injectable({
  providedIn: ProductsServiceModule
})
export class ProductService {

  public getProducts(): Promise<Array<ProductModel>> {
    return productListPromise;
  }

  public getProduct(sku: string): Promise<ProductModel> {
    return this.getProducts()
              .then( list => list.find(p => p.sku === sku ) )
              .catch(() => Promise.reject('Error when getting product ' + sku));
  }

  public updateProduct(product: ProductModel): void {
    console.log('updated: ' + product.sku);
    const i = productList.findIndex(p => p.sku === product.sku);
    if (i > -1) {
      productList.splice(i, 1, product);
    }
  }

  public createProduct(product: ProductModel): void {
    console.log('created: ' + product.sku);
    productList.push(product);
  }
}
