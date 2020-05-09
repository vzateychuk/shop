// core modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Application
import { AppComponent } from './app.component';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { Router } from '@angular/router';

// Store
import { RootStoreModule } from './core/@ngrx/root-store.module';

// Store DevTools
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

// Routing
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserModule,
    CartModule,
    ProductsModule,
    SharedModule,
    RootStoreModule,
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
