import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product, ProductModel } from 'src/app/shared';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
// rxjs
import { Observable, Subscription } from 'rxjs';
import {
  AppState,
  ProductsState,
  loadProductAction,
  updateProductAction,
  createProductAction
} from 'src/app/core/@ngrx';
import { Store, select } from '@ngrx/store';
import { error } from 'protractor';

@Component({
  selector: 'epa-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  product: Product;
  productState$: Observable<ProductsState>;
  private sub: Subscription;
  private editMode = false;

  constructor(
    private rounter: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.productState$ = this.store.pipe( select('productsState') );
    const observer = {
      next: state => {
        if (state.selectedProduct) {
          this.editMode = true;
          this.product = {...state.selectedProduct};
        } else {
          this.product = new ProductModel();
        }
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('ProductEdit Stream is completed');
      }
    };
    this.sub = this.productState$.subscribe(observer);

    const productObserver = {
      next: (params: ParamMap) => {
        const skuParam = params.get('sku');
        // If there is SKU we extracted from params, we fire LOAD_PRODUCT_ACTION
        if (skuParam) {
          this.store.dispatch(loadProductAction({sku: skuParam}));
        }
      }
    };

    this.route.paramMap.subscribe(productObserver);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSaveProduct() {
    const product = { ...this.product };

    if (this.editMode) {
      this.store.dispatch(updateProductAction({product}));
    } else {
      this.store.dispatch(createProductAction({product}));
    }
    this.onGoBack();
  }

  onGoBack() {
    this.rounter.navigate(['/products']);
  }
}
