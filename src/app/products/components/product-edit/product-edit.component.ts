import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product, ProductModel, Category } from 'src/app/shared';
import { ActivatedRoute, Router, Params, ParamMap, UrlTree } from '@angular/router';
// rxjs
import { Observable, Subscription } from 'rxjs';
import {
  AppState,
  ProductsState,
  LoadProductAction,
  UpdateProductAction,
  CreateProductAction,
  productsStateSelector
} from 'src/app/core/@ngrx';
import { Store, select } from '@ngrx/store';
import { error } from 'protractor';
import { CanComponentDeactivate, DialogService } from 'src/app/core';

@Component({
  selector: 'epa-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  product: Product;
  original: Product;
  productState$: Observable<ProductsState>;
  private sub: Subscription;
  private editMode = false;

  constructor(
    private rounter: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.productState$ = this.store.pipe( select(productsStateSelector) );
    const observer = {
      next: state => {
        if (state.selectedProduct) {
          this.editMode = true;
          this.product = {...state.selectedProduct};
        } else {
          this.product = new ProductModel();
        }
        this.original = {...this.product};
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
          this.store.dispatch(LoadProductAction({sku: skuParam}));
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
    this.original = {...this.product};

    if (this.editMode) {
      this.store.dispatch(UpdateProductAction({product}));
    } else {
      this.store.dispatch(CreateProductAction({product}));
    }
    this.onGoBack();
  }

  onGoBack() {
    this.rounter.navigate(['/products']);
  }

    // вызывается когда пользователь пробует уйти с формы
  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const flags = Object.keys(this.original).map(key => {
        if (this.original[key] === this.product[key]) {
          return true;
        } else {
          return false;
        }
    });

    if (flags.every(el => el)) {
        return true;
    }

      // Ask the user with the dialog service and return its
      // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

}
