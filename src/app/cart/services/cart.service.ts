import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { CartServiceModule } from '../cart-service.module';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CartItem } from '../models';
import { Observable, throwError } from 'rxjs';
import { retry, publish, map, catchError, tap } from 'rxjs/operators';
import { Product } from 'src/app/shared';
import 'rxjs/add/observable/interval';

@Injectable({
  providedIn: CartServiceModule
})
export class CartService {
  baseUrl = 'http://localhost:3000/cart';
  private options = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor( private http: HttpClient ) { }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseUrl)
      .pipe(
        retry(3),
        tap(items => console.log(JSON.stringify(items))),
        catchError(this.handleError)
      );
  }

  getCartItem(sku: string): Observable<CartItem> {
    const url = `${this.baseUrl}/${sku}`;

    return this.http.get<CartItem>(url)
      .pipe(
        retry(3),
        tap(item => console.log(JSON.stringify(item))),
        catchError(this.handleError)
      );
  }

  createCartItem(product: Product, productAmount: number): Observable<CartItem> {
    const newCartItem = {
      sku: product.sku,
      price: product.price,
      amount: productAmount
    } as CartItem;
    const body = JSON.stringify(newCartItem);

    return this.http.post(this.baseUrl, body, this.options)
      .pipe(
        retry(3),
        tap(item => console.log(JSON.stringify(item))),
        catchError(this.handleError)
      );
  }

  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    const url = `${this.baseUrl}/${cartItem.sku}`;
    const body = JSON.stringify(cartItem);

    return this.http.put(url, body, this.options)
      .pipe(
        map(resp => resp as CartItem),
        tap(item => console.log(JSON.stringify(item))),
        catchError(this.handleError)
      );
  }

  // addToCart(product: Product, productAmount: number): Promise<CartItem> {
  //   return this.getCartItem(product.sku)
  //     .then(cartItem => {
  //       const newAmount = cartItem.amount + productAmount;
  //       const toUpdate = {...cartItem, amount: newAmount};
  //       return this.updateCartItem(toUpdate);
  //     })
  //     .then(updated => updated as CartItem)
  //     .catch(this.handleError);
  // }

    /** Private methods area */
  private handleError(err: HttpErrorResponse): Observable<any> {
    let errorMessage: string;

    if (err.error instanceof Error) {
      // In case of client-side or network error occurred.
      errorMessage = `Client-side or network error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      errorMessage = `Backend returns code ${err.status}, body was: ${err.error}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
