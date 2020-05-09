import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent, ProductEditComponent } from './components';

const routes: Routes = [
  { path: 'products', component: ProductListComponent},
  { path: 'products/add', component: ProductEditComponent},
  { path: 'products/edit/:sku', component: ProductEditComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
