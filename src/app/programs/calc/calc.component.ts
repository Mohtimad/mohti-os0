import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
})
export class CalcComponent implements OnInit {
  display: string = '0';
  constructor() {}

  ngOnInit(): void {}

  clear() {
    this.display = '0';
  }

  deleteChar() {
    const length = this.display.length;
    if (length > 1 && this.display !== 'error') {
      this.display = this.display.substring(0, length - 1);
    } else {
      this.clear();
    }
  }

  calc() {
    try {
      this.display = eval(this.display);
    } catch {
      this.display = 'error';
    }
  }

  touch(e: MouseEvent) {
    if (e.target instanceof Element) {
      const eltName = e.target.tagName;
      if (eltName === 'BUTTON') {
        let value = e.target.textContent;
        if (value && /^([0-9%+\-*\/\.\(\)]){1}$/.test(value)) {
          this.display =
            this.display === '0' || this.display === 'error'
              ? value
              : this.display + value;
        }
      }
    }
  }
}
