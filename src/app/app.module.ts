// core modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

// Application
import { AppComponent } from './app.component';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { OrderModule } from './order/order.module';

// Store
import { RootStoreModule } from './core/@ngrx/root-store.module';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SpinnerModule } from './widgets/spinner/spinner.module';
import { ValidatorsModule } from './validators/validators.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SpinnerModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    CartModule,
    ProductsModule,
    SharedModule,
    OrderModule,
    RootStoreModule,
    ValidatorsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
