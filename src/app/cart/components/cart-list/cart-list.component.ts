import { Component, OnInit, Input } from '@angular/core';
import { CartItemModel, CartItem } from '../../models';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/@ngrx';
import { Store, select } from '@ngrx/store';
import {
  CartState,
  cartStateSelector,
  DeleteCartItemAction,
  DeleteAllCartAction,
  selectCartData
} from 'src/app/core/@ngrx/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'epa-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  // cartState$: Observable<CartState>;
  cartItem$: Observable<ReadonlyArray<CartItem>>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.cartItem$ = this.store.pipe(select(selectCartData));
  }

  onDeleteItem(item: CartItemModel) {
    const deleted = {...item};
    this.store.dispatch(DeleteCartItemAction({item: deleted}));
  }

  onDeleteAll() {
    this.store.dispatch( DeleteAllCartAction() );
  }

  onOrder() {
    this.router.navigate(['order']);
  }
}
