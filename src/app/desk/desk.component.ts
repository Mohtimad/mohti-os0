import { Component, OnInit } from '@angular/core';
import { WindowsService } from '../services/windows.service';
import { Desk } from './desk.model';
import { Program, programs } from '../services/programs';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.scss'],
})
export class DeskComponent implements OnInit {
  windows!: Program[];
  programs: Program[] = programs;
  deskData: Desk = {
    width: 0,
    height: 0,
    cursor: {
      x: 0,
      y: 0,
    },
  };

  constructor(
    private _windowsService: WindowsService,
    private _settings: SettingsService
  ) {}

  ngOnInit(): void {
    this._windowsService.windows.subscribe((p) => (this.windows = p));
  }

  get background() {
    return this._settings.getBackgroundStyle();
  }

  onMouseMove(e: MouseEvent, elt: HTMLElement) {
    let x = e.clientX;
    let y = e.clientY;
    let width = elt?.offsetWidth;
    let height = elt?.offsetHeight;
    if (width && height) {
      let cursorX = (100 * x) / width;
      let cursorY = (100 * y) / height;
      this.deskData['width'] = width;
      this.deskData['height'] = height;
      this.deskData['cursor']['x'] = cursorX;
      this.deskData['cursor']['y'] = cursorY;
    }
  }

  onOpen(component: string, index: number) {
    const program = this.windows.find(
      (program) => program.component === component
    );
    if (!program) {
      this._windowsService.addProgram({ ...this.programs[index] });
    } else {
      this.windows.forEach((program, i) => {
        if (program.component === component) {
          this._windowsService.hideOrShow(i);
        }
      });
    }
  }

  isOpen(component: string) {
    return this._windowsService.isOpen(component);
  }
}
