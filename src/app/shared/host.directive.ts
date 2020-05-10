import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[epaHost]'
})
export class HostDirective {

  private showClass = false;

  @HostBinding('class.my-border-class')
  public get showBorder(): boolean {
    // className = 'my-border-class';
    return this.showClass;
  }

  @HostListener('click')
  onClickHost() {
    console.log('HostDirective.onClickHost()');
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event) {
    this.showClass = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event) {
    this.showClass = false;
  }

}
