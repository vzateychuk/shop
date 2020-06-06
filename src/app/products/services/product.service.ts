import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared';
import { ProductsServiceModule } from '../products-service.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: ProductsServiceModule
})
export class ProductService {

  baseUrl = 'http://localhost:3000/products';
  private options = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor( private http: HttpClient ) {}

  public getProducts(): Promise<Array<Product>> {
    return this.http
      .get(this.baseUrl)
      .toPromise()  // because get(...) returns Observable
      .then (resp => resp as Array<Product>)
      .catch(this.errorHandler);
  }

  public getProduct(sku: string): Promise<Product> {
    console.log(`productService.getProduct(), sku=${sku}`);
    const productUrl = `${this.baseUrl}/${sku}`;

    return this.http
      .get(productUrl)
      .pipe( delay(3000) )
      .toPromise()
      .then(resp => resp as Product)
      .catch(this.errorHandler);
  }

  public updateProduct(product: Product): Promise<Product> {
    const productUrl = `${this.baseUrl}/${product.sku}`;
    const body = JSON.stringify(product);

    return this.http
      .put(productUrl, body, this.options)
      .pipe( delay(1000) )
      .toPromise()
      .then(resp => resp as Product)
      .catch(this.errorHandler);
  }

  public createProduct(product: Product): Promise<Product> {
    const body = JSON.stringify(product);

    return this.http
      .post(this.baseUrl, body, this.options)
      .pipe( delay(1000) )
      .toPromise()
      .then(resp => resp as Product)
      .catch(this.errorHandler);
  }

  public deleteProduct(product: Product): Promise<any> {
    const productUrl = `${this.baseUrl}/${product.sku}`;

    return this.http
      .delete(productUrl)
      .toPromise()
      // json-server return empty object so we don't use .then(...)
      .then(resp => resp as Product)
      .catch(this.errorHandler);
  }

  public addToCard(product: Product, amount: number): Promise<Product> {
    const reducedAmount = product.amountAvailable - amount;
    if (reducedAmount >= 0) {
      const updated = {...product, amountAvailable: reducedAmount};
      // TODO: add updateCart enpoint
      return this.updateProduct(updated);
    } else {
      return Promise.reject('Not enough product');
    }
  }

  /** Private methods area */
  private errorHandler(error: any): Promise<any> {
    console.log('An error accured', error);
    return Promise.reject(error.message || error);
  }
}
