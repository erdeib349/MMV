import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBold]'
})
export class BoldDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
  }
}
