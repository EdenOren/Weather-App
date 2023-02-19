import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class FocusDirective {
  constructor(private elemRef: ElementRef) {}

  ngAfterViewInit() {
    this.elemRef.nativeElement.focus();
  }
}