import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared';
import { ProductsServiceModule } from '../products-service.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: ProductsServiceModule
})
export class ProductService {

  private baseUrl = 'http://localhost:3000/products';

  constructor( private http: HttpClient ) {}

  public getProducts(): Promise<Product[]> {
    return this.http
      .get(this.baseUrl)
      .toPromise()  // because get(...) returns Observable
      .then (resp => resp as Product[])
      .catch(this.errorHandler);
  }

  public getProduct(sku: string): Promise<Product> {
    const productUrl = `${this.baseUrl}/${sku}`;

    return this.http
      .get(productUrl)
      .toPromise()
      .then(resp => resp as Product)
      .catch(this.errorHandler);
  }

  public updateProduct(product: Product): Promise<Product> {
    const productUrl = `${this.baseUrl}/${product.sku}`;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http
      .put(productUrl, body, options)
      .toPromise()
      .then(resp => resp as Product)
      .catch(this.errorHandler);
  }

  public createProduct(product: Product): Promise<Product> {
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http
      .post(this.baseUrl, body, options)
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
      .catch(this.errorHandler);
  }

  public CheckIfAvailable(product: Product): Promise<boolean> {
    return Promise.resolve(true);
  }

  /** Private methods area */
  private errorHandler(error: any): Promise<any> {
    console.log('An error accured', error);
    return Promise.reject(error.message || error);
  }
}
