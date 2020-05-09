import { Injectable } from '@angular/core';
import { Product, Category, ProductModel } from 'src/app/shared';
import { ProductsServiceModule } from '../products-service.module';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: ProductsServiceModule
})
export class ProductService {

  private productList: Array<Product> = [
    new ProductModel( 'MYSHOES', 'My shoes', Category.Durable, 3, 109.99, 'Black Running Shoes' ),
    new ProductModel( 'NEATOJACKET', 'Blue Jacket', Category.Durable, 2, 238.99),
    new ProductModel( 'PANTS', 'My buiteful pants', Category.Durable, 4, 117.99 ),
    new ProductModel( 'NICEHAT', 'A Nice Black Hat', Category.Nondurable, 1, 29.99 ),
  ];
  private productListObservable = of(this.productList);

  public getProducts(): Promise<Array<Product>> {
    return this.productListObservable.toPromise();
  }

  public getProduct(sku: string): Promise<Product> {
    return this.getProducts()
              .then( list => list.find(p => p.sku === sku ) )
              .catch(() => Promise.reject('Error when getting product ' + sku));
  }

  public updateProduct(product: Product): Promise<Product> {
    const idx = this.productList.findIndex(p => p.sku === product.sku);
    const updated = {...product} as ProductModel;
    if (idx > -1) {
      const array = [... this.productList];
      array.splice(idx, 1, updated);
      this.productList = [...array];
    }
    return Promise.resolve(updated);
  }

  public createProduct(product: Product): Promise<Product> {
    const created = {...product} as ProductModel;
    const array = [... this.productList];
    array.push(created);
    this.productList = [...array];
    return Promise.resolve(created);
  }

  public deleteProduct(product: Product): Promise<Product> {
    const idx = this.productList.findIndex(p => p.sku === product.sku);
    const deleted = {...product} as ProductModel;
    if (idx > -1) {
      const array = [... this.productList];
      array.splice(idx, 1);
      this.productList = [...array];
    }
    return Promise.resolve(deleted);
  }

  public CheckIfAvailable(product: Product): Promise<boolean> {
    const idx = this.productList.findIndex(p => p.sku === product.sku);
    const reducedAmount = product.amountAvailable - 1;
    if (idx > -1 && reducedAmount >= 0) {
      return Promise.resolve(true);
    } else {
      return Promise.reject(new Error('No enough amount available of: ' + product.sku));
    }
  }

}
