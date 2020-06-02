import { Component } from '@angular/core';
import { SpinnerService } from './widgets';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public spinnerService: SpinnerService
  ) { }
}
