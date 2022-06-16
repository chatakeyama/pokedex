import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumbersAndDots]'
})
export class OnlyNumbersAndDotsDirective {

  constructor() { }

  @HostListener('keypress', ['$event']) onKeypress = (event: any) => {
    const pattern = /^[0-9|\.]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

}
