import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Program } from './programs';

@Injectable({
  providedIn: 'root',
})
export class WindowsService {
  programsActive: Program[] = [];

  windows: Observable<Program[]> = of(this.programsActive);

  constructor() {}

  setPosition(p: 'left' | 'top', id: number, value: number): void {
    this.programsActive[id][p] = value;
  }

  addProgram(data: Program) {
    this.programsActive.push(data);
  }

  hideOrShow(index: number) {
    this.programsActive[index].hidden = !this.programsActive[index].hidden;
  }

  isOpen(selector: string) {
    const isOpen = this.programsActive.find((p) => p.component === selector);
    if (isOpen) {
      return true;
    }
    return false;
  }

  close(index: number) {
    this.programsActive.splice(index, 1);
  }

  swapFullScreen(index: number) {
    this.programsActive[index].status =
      this.programsActive[index].status === 'fullscreen'
        ? 'custom'
        : 'fullscreen';
  }

  forefront(index: number): void {
    for (const [i, program] of this.programsActive.entries()) {
      if (index === i) {
        this.programsActive.push(program);
        this.programsActive.splice(i, 1);
        break;
      }
    }
  }
}
