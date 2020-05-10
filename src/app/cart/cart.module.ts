import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent, CartViewComponent } from './components';
import { CartServicesModule } from './cart-services.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CartListComponent,
    CartViewComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    CartServicesModule,
    CartRoutingModule
  ]
})
export class CartModule { }
