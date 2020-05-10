import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle') titleTag: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.titleTag.nativeElement.innerHTML = 'My Shop application';
  }
}
