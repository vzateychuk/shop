import { Injectable } from '@angular/core';
import { CartServiceModule } from '../cart-service.module';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CartItem } from '../models';
import { Observable } from 'rxjs';
import { retry, publish } from 'rxjs/operators';

@Injectable({
  providedIn: CartServiceModule
})
export class CartService {
  baseUrl = 'http://localhost:3000/cart';
  private options = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor( private http: HttpClient ) { }

  // добавленные товары в корзину
  getCartItems(): Promise<CartItem[]> {
    return this.http
    .get<CartItem[]>(this.baseUrl)
    .toPromise()
    .then( resp => resp as CartItem[] )
    .catch(this.errorHandler);
  }

  createCartItem(item: CartItem) {
    const body = JSON.stringify(item);

    return this.http
      .post(this.baseUrl, body, this.options)
      .toPromise()
      .then(added => added as CartItem)
      .catch(this.errorHandler);
  }
    /** Private methods area */
  private errorHandler(error: any): Promise<any> {
    console.log('An error accured', error);
    return Promise.reject(error.message || error);
  }
}
