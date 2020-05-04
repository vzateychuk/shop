import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ProductModel } from 'src/app/shared';

@Component({
  selector: 'epa-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductViewComponent {

  @Input() product: ProductModel;
  @Output() editProduct = new EventEmitter<ProductModel>();
  @Output() addToCart = new EventEmitter<ProductModel>();
  @HostBinding('attr.class') cssClass = 'item';

  onEditProduct() {
    this.editProduct.emit(this.product);
  }

  onBuy() {
    this.addToCart.emit(this.product);
  }

}
