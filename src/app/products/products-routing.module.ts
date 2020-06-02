import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductListComponent, ProductEditComponent } from './components';
import { CanDeactivateGuard } from '../core';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'add',
        component: ProductEditComponent
      },
      {
        path: 'edit/:sku',
        component: ProductEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: '',
        component: ProductListComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {
  static components = [
    ProductsComponent,
    ProductListComponent,
    ProductEditComponent
  ];
}
