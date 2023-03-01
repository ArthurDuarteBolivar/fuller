import  Inputmask  from 'inputmask';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTelMask]'
})
export class TelMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    Inputmask({"mask": "(99) 99999-9999"}).mask(this.el.nativeElement);
  }

}

