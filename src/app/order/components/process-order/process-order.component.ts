import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { OrderModel } from '../../models';
import { AddressValidator } from '../../validators';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'epa-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css']
})
export class ProcessOrderComponent implements OnInit, OnDestroy {

  // validation for Customer name
  validationMessage: string;
  private validationMessagesMap = {
    customerControl: {
      required: 'Please enter customer name.',
      minlength: 'Expecter name length more than 3 symbols',
      maxlength: 'Customer name should not be more than 10 symbols'
    }
  };

  private sub: Subscription = new Subscription();

  // data model
  order: OrderModel = new OrderModel(
    'Vlad',
    '123456',
    'vlad@vlad.com',
    false,
    'Belarus'
  );
  // form model
  orderForm: FormGroup;
  // avaliable addresses
  addresses: Array<string> = ['Ukraine', 'Armenia', 'Belarus', 'Hungary', 'Kazakhstan', 'Poland', 'Russia'];
  // placeholders for email/phone
  placeholder = {
    email: 'Email (required)',
    phone: 'Phone'
  };


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.orderForm = this.buildForm();
    this.watchValueChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSave() {
    // Form model
    console.log(this.orderForm);
    // Form value without disabled controls
    console.log(`Value(no disabled): ${JSON.stringify(this.orderForm.value)}`);
    // Form value with disabled controls
    console.log(`RawValue(with disabled): ${JSON.stringify(this.orderForm.getRawValue())}`);
  }

  onLogFormModel() {
    console.log(this.orderForm);
  }

  onSetNotification(notifyVia: string) {
    const phoneCtrl = this.orderForm.get('phoneControl');
    const emailCtrl = this.orderForm.get('emailControl');

    if (notifyVia === 'phone') {
      phoneCtrl.setValidators([Validators.required, Validators.minLength(3)]);
      emailCtrl.clearValidators();
      this.placeholder.email = 'Email';
      this.placeholder.phone = 'Phone (required)';
    } else {
      emailCtrl.setValidators( [ Validators.required, Validators.email ]);
      phoneCtrl.clearValidators();
      this.placeholder.email = 'Email (required)';
      this.placeholder.phone = 'Phone';
    }
    phoneCtrl.updateValueAndValidity();
    emailCtrl.updateValueAndValidity();
  }

  onSelfDeliveryClick() {
    const selfDeliveryCtrl = this.orderForm.get('selfDeliveryControl');
    const addressCtrl = this.orderForm.get('addressControl');
    console.log('Self-delivery control value: ' + selfDeliveryCtrl.value);

    if (selfDeliveryCtrl.value) {
      addressCtrl.enable();
      addressCtrl.setValidators( [AddressValidator.addressValidator] );
      addressCtrl.updateValueAndValidity();
    } else {
      addressCtrl.clearValidators();
      addressCtrl.disable();
    }
  }

  onBlur(controlName: string) {
    const control = this.orderForm.get(controlName);
    this.setValidationMessage(control, controlName);
  }

  get getProducts(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  onAddProduct(): void {
    this.getProducts.push(this.buildProductFormGroup());
  }

  onRemoveProduct(index: number): void {
    this.getProducts.removeAt(index);
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      customerControl: new FormControl(
        '',
        [ Validators.required, Validators.minLength(3), Validators.maxLength(10) ]
      ),
      phoneControl: '',
      emailControl: [ '', [Validators.required, Validators.email] ],
      notification: 'email',
      selfDeliveryControl: true,
      addressControl: {value: 'Russia', disabled: true},
      products: this.fb.array( [this.buildProductFormGroup()] )
    });
  }

  private buildProductFormGroup(): FormGroup {
    return this.fb.group({
      skuCtl: 'sku',
      productCtl: 'product'
    });
  }

  private watchValueChanges() {
    const customerControl = this.orderForm.get('customerControl');
    const customerControlSub = customerControl.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value =>
        this.setValidationMessage(customerControl, 'customerControl')
      );
    this.sub.add(customerControlSub);
  }

  private setValidationMessage(c: AbstractControl, controlName: string) {
    this.validationMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.validationMessage = Object.keys(c.errors)
        .map(key => this.validationMessagesMap[controlName][key])
        .join(' ');
    }
  }
}
