import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CartItemModel } from '../../models';

@Component({
  selector: 'epa-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartViewComponent {

  @Input() cartItem: CartItemModel;
  @Output() deleteItem = new EventEmitter<CartItemModel>();

  constructor() { }

  onDeleteItem() {
    this.deleteItem.emit(this.cartItem);
  }

  get totalPrice() {
    return this.cartItem.price * this.cartItem.amount;
  }
}
