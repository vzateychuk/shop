import { Component, OnInit, Input } from '@angular/core';
import { CartItemModel, CartItem } from '../../models';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/@ngrx';
import { Store, select } from '@ngrx/store';
import { CartState, cartStateSelector, DeleteCartItemAction, DeleteAllCartItemsAction } from 'src/app/core/@ngrx/cart';

@Component({
  selector: 'epa-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  cartState$: Observable<CartState>;
  cartItems$: Observable<Array<CartItemModel>>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.cartState$ = this.store.pipe(select(cartStateSelector));
  }

  onDeleteItem(item: CartItemModel) {
    const deleted = {...item};
    this.store.dispatch(DeleteCartItemAction({item: deleted}));
  }

  onDeleteAll() {
    this.store.dispatch( DeleteAllCartItemsAction() );
  }

}
