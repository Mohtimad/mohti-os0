import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Program, programsComponents } from 'src/app/services/programs';
import { SettingsService } from 'src/app/services/settings.service';
import { WindowsService } from 'src/app/services/windows.service';
import { Desk } from '../desk.model';
import { ProgramDirective } from './program.directive';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit {
  @Input() deskData!: Desk;
  @Input() index!: number;
  @ViewChild(ProgramDirective, { static: true }) appProgram!: ProgramDirective;
  program!: Program;
  subscription!: Subscription;

  str = 'CalcComponent';

  /*
   ** this data is for calculating the
   ** position differences when moving
   */

  canMove: boolean = false;
  diff = { x: 0, y: 0 };
  top!: number;
  left!: number;

  constructor(
    private _windowsService: WindowsService,
    private _settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.subscription = this._windowsService.windows.subscribe((programs) => {
      this.program = programs[this.index];
    });

    const component = programsComponents.find(
      (c) => c.name === this.program.component
    );
    const viewContainerRef = this.appProgram.viewContainerRef;
    if (component) {
      viewContainerRef.createComponent(component);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get getColor() {
    return this._settings.getColor('primaryColor');
  }

  onClose() {
    this._windowsService.close(this.index);
  }

  onSelect(e: Event) {
    this._windowsService.forefront(this.index);
  }

  onMove(e: Event) {
    const status = this.program.status;
    if (e.target === e.currentTarget) {
      if (this.canMove && status !== 'fullscreen') {
        this._windowsService.setPosition('left', this.index, this.left);
        this._windowsService.setPosition('top', this.index, this.top);
        this.canMove = false;
      } else {
        this.diff.y = this.deskData.cursor['y'] - this.program.top;
        this.diff.x = this.deskData.cursor['x'] - this.program.left;
        this.canMove = status === 'fullscreen' ? false : true;
      }
    }
  }

  onHide() {
    this._windowsService.hideOrShow(this.index);
  }

  onSwapFullScreen() {
    this._windowsService.swapFullScreen(this.index);
  }

  getPosition(v: 'top' | 'left') {
    if (this.program.status === 'fullscreen' || this.isMobile()) {
      return 0;
    } else if (this.canMove) {
      const position = v === 'top' ? 'y' : 'x';
      this[v] = this.deskData.cursor[position] - this.diff[position];
      return this.deskData.cursor[position] - this.diff[position];
    } else {
      return this.program[v];
    }
  }

  getSize(v: 'width' | 'height') {
    if (this.program.status === 'fullscreen' || this.isMobile()) {
      const params = v === 'width' ? 'vw' : 'vh';
      return 100 + params;
    } else {
      return this.program[v];
    }
  }

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
}
