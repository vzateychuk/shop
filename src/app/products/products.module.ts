import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductListComponent, ProductViewComponent, ProductEditComponent } from './components';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsServiceModule } from './products-service.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductViewComponent,
    ProductEditComponent],
  imports: [
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
