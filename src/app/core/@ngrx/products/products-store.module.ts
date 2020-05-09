import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Store
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './products.reducer';
// Effects
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './products.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('productsState', productsReducer),
    EffectsModule.forFeature([ProductsEffects])
  ]
})
export class ProductsStoreModule { }
