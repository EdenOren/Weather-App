import { Directive, ElementRef } from '@angular/core';

/**
 * This directive can be used to add focus to an element, if possible.
 */
@Directive({
  selector: '[autofocus]'
})
export class FocusDirective {
  constructor(private elemRef: ElementRef) {}

  ngAfterContentInit () {
    this.elemRef.nativeElement.focus();
  }
}