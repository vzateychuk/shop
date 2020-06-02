import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductViewComponent } from './components';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsServiceModule } from './products-service.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductViewComponent,
    ProductsRoutingModule.components
  ],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    ProductsServiceModule,
    ProductsRoutingModule
  ],
  exports: []
})
export class ProductsModule { }
