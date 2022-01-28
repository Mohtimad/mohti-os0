import { Directive, ViewContainerRef } from '@angular/core';

// only for dynamic display of components in windows

@Directive({
  selector: '[appProgram]',
})
export class ProgramDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
