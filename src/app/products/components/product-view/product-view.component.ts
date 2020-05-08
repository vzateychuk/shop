import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Product } from 'src/app/shared';

@Component({
  selector: 'epa-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductViewComponent {

  @Input() product: Product;
  @Output() editProduct = new EventEmitter<Product>();
  @Output() addToCart = new EventEmitter<Product>();
  @HostBinding('attr.class') cssClass = 'item';

  onEditProduct() {
    this.editProduct.emit(this.product);
  }

  onBuy() {
    this.addToCart.emit(this.product);
  }

}
