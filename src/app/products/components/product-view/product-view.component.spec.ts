import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { ProductViewComponent } from './product-view.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Product, Category } from 'src/app/shared';

describe('ProductViewComponent', () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;
  let deTitle: DebugElement;
  let elTitle: HTMLElement;

  const productConst = {
    sku: 'PRODUCT-SKU',
    name: 'name',
    category: Category.Durable,
    amountAvailable: 10,
    price: 1.99,
    description: 'string'
  } as Product;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [],
      declarations: [ ProductViewComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    component.product = productConst;

    fixture.detectChanges();
    deTitle = fixture.debugElement.query(By.css('.pannel-title'));
    elTitle = deTitle.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display a SKU in title', () => {
    expect(elTitle.textContent).toContain(productConst.sku);
  });

  it('Click on "Edit" emits editProduct event', () => {
    // arrange
    let expectedProduct: Product;
    component.editProduct.subscribe((product: Product) => expectedProduct = product);
    const button = fixture.debugElement.query(By.css('#editProduct'));
    // act
    button.triggerEventHandler('click', null);
    // assert
    expect(expectedProduct).toBe(productConst);
  });

  it('Click on "Delete" emits deleteProduct event', () => {
    // arrange
    let expectedProduct: Product;
    component.deleteProduct.subscribe((product: Product) => expectedProduct = product);
    const button = fixture.debugElement.query(By.css('#deleteProduct'));
    // act
    button.triggerEventHandler('click', null);
    // assert
    expect(expectedProduct).toBe(productConst);
  });

  it('Click on "AddToCart" button emits addToCart event', () => {
    // arrange
    let expectedProduct: Product;
    component.addToCart.subscribe((product: Product) => expectedProduct = product);
    const button = fixture.debugElement.query(By.css('#addToCart'));
    // act
    button.triggerEventHandler('click', null);
    // assert
    expect(expectedProduct).toEqual(productConst);
  });

  // onAddToCart() {
  //   this.addToCart.emit(this.product);
  // }

  afterEach(() => {
    fixture.destroy();
  });

});
