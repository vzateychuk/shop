import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
// rxjs
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'epa-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;

  constructor(
    private rounter: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const productObserver = {
      next: (product: Product) => {
        console.log(product);
        this.product = { ...product };
      },
      error: (err: any) => console.log(err)
    };
    // it is not necessary to save subscription to route.paramMap
    // when router destroys this component, it handles subscriptions automatically
    this.route.paramMap
      .pipe(
        switchMap( (params: Params) => this.productService.getProduct( params.get('sku') )
      ) ).subscribe(productObserver);

  }

  onSaveProduct() {
    console.log('ProductEditComponent.onSaveProduct()');
    const product = { ...this.product } as Product;

    if (product.sku) {
      this.productService.updateProduct(product);
    } else {
      this.productService.createProduct(product);
    }
    this.onGoBack();
  }

  onGoBack() {
    this.rounter.navigate(['/products']);
  }
}
