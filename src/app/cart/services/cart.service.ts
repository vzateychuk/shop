import { Injectable } from '@angular/core';
import { CartItemModel } from '../models';
import { CartServicesModule } from '../cart-services.module';
// rxjs
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const cartItems: Array<CartItemModel> = [
  new CartItemModel('MYSHOES', 109.99, 2),
  new CartItemModel('NEATOJACKET', 238.99, 3),
  new CartItemModel('NICEHAT', 29.99, 5)
];

const cartItemsObservable: Observable<Array<CartItemModel>> = of(cartItems);

@Injectable({
  providedIn: CartServicesModule
})
export class CartService {

  getCartItems(): Observable<CartItemModel[]> {
    return cartItemsObservable;
  }

  getCartItem(sku: string): Observable<CartItemModel> {
    return this.getCartItems().pipe(
      map( (items: Array<CartItemModel>) => items.find(item => item.sku === sku) ),
      catchError( err => throwError('Error when getting CartItem: ' + sku) )
    );
  }

  createOrUpdateCartItem(cartItem: CartItemModel) {
    const idx = cartItems.findIndex(item => item.sku === cartItem.sku);

    if (idx > -1) {
      const copy = { ...cartItems[idx] };
      copy.amount = ++cartItems[idx].amount;
      cartItems.splice(idx, 1, copy);
    } else {
      cartItems.push(cartItem);
    }
  }

  removeItem(cartItem: CartItemModel) {
    const idx = cartItems.findIndex(item => item.sku === cartItem.sku);
    if (idx > -1) {
      cartItems.splice(idx, 1);
    }
  }

}
