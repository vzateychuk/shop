import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, ProductModel, } from 'src/app/shared';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
// rxjs
import { Observable, Subscription, Subject } from 'rxjs';
import {
  AppState,
  UpdateProductAction,
  CreateProductAction,
  getProductByUrl
} from 'src/app/core/@ngrx';
import { Store, select } from '@ngrx/store';
import { error } from 'protractor';
import { CanComponentDeactivate, DialogService } from 'src/app/core';
import { pluck, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'epa-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {

//  selectedProduct$: Observable<Product>;
  product: Product;
  original: Product;
  private editMode = false;
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private rounter: Router,
    private store: Store<AppState>,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const observer: any = {
      next: prd => {
        this.editMode = true;
        this.product = {...prd};
        this.original = {...prd};
      },
      error(err) { console.log(err); },
      complete() { console.log('ProductEdit Stream is completed'); }
    };

    this.store.pipe(
      select( getProductByUrl),
      takeUntil(this.componentDestroyed$)
    ).subscribe(observer);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSaveProduct() {
    this.product = { ...this.product };
    this.original = {...this.product};

    if (this.editMode) {
      this.store.dispatch(UpdateProductAction({product: this.product}));
    } else {
      this.store.dispatch(CreateProductAction({product: this.product}));
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
