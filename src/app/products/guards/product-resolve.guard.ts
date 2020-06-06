import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Product, ProductModel } from 'src/app/shared';
import { ProductService } from '../services';
import { SpinnerService } from 'src/app/widgets';

@Injectable({
  providedIn: 'any'
})
export class ProductResolveGuard implements Resolve<Product> {

  constructor(
    private productService: ProductService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<Product | null> {
    console.log('ProductResolve Guard is called');

    if (route.paramMap.has('sku')) {
      this.spinner.show();
      const sku = route.paramMap.get('sku');

      return this.productService.getProduct(sku)
        .then((product: Product) => {
          if (product) {
            return product;
          } else {
            this.router.navigate(['/products']);
            return null;
          }
        })
        .catch(() => {
          this.router.navigate(['/products']);
          return Promise.reject(null);
        })
        .finally( () => this.spinner.hide() );
    } else {
      return Promise.resolve(new ProductModel(null, '') as Product);
    }
  }

}
