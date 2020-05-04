import { Component, OnInit, Input } from '@angular/core';
import { CartItemModel } from '../../models';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'epa-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cartItems$: Observable<Array<CartItemModel>>;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItems();
  }

  onRemoveItem(cartItem: CartItemModel) {
    console.log('CartList.onRemoveItem: ' + cartItem.sku);
    this.cartService.removeItem(cartItem);
  }

}
