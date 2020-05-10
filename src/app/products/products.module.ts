import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductListComponent, ProductViewComponent, ProductEditComponent } from './components';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsServiceModule } from './products-service.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductViewComponent,
    ProductEditComponent],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    ProductsServiceModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductsModule { }
