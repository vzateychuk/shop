import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { CartViewComponent } from './cart-view.component';
import { CartItemModel, CartItem } from '../../models';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CartViewComponent', () => {
  let component: CartViewComponent;
  let fixture: ComponentFixture<CartViewComponent>;

  const cartItemConst = new CartItemModel( 'sku-value', 123, 1 );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartViewComponent ],
      // providers: [
      //   { provide: ComponentFixtureAutoDetect, useValue: true }
      // ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
    component.cartItem = cartItemConst;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display SKU in title', () => {
    const de: DebugElement = fixture.debugElement.query( By.css('.pannel-title') );
    const elTitle: HTMLElement = de.nativeElement;
    expect(elTitle.textContent).toContain(cartItemConst.sku);
  });

  it('Click on "Delete" emits delete event', () => {
    // arrange
    let expected: CartItemModel;
    component.deleteItem.subscribe((deletedItem: CartItemModel) => expected = deletedItem);
    const button = fixture.debugElement.query(By.css('#deleteCartItem'));
    // act
    button.triggerEventHandler('click', null);
    // assert
    expect(expected).toBe(cartItemConst);
  });
});
