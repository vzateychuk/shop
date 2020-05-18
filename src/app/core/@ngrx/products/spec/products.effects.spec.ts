import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { ProductsEffects } from '..';

describe('ProductsEffects', () => {
  const actions$: Observable<any> = of(true);
  let effects: ProductsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ProductsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
