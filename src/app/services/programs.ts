import { BrowserComponent } from '../programs/browser/browser.component';
import { CalcComponent } from '../programs/calc/calc.component';
import { SettingsComponent } from '../programs/settings/settings.component';

export interface Program {
  hidden: boolean;
  status: string;
  icon?: string;
  component: string;
  title: string;
  top: number;
  left: number;
  minWidth?: number | string;
  minHeight?: number | string;
  width: number | string;
  height: number | string;
}

export const programs = [
  {
    hidden: false,
    status: 'custom',
    icon: './assets/icons/settings.png',
    component: 'SettingsComponent',
    title: 'Options',
    top: 25,
    left: 25,
    minWidth: '300px',
    minHeight: '400px',
    width: 'auto',
    height: 'auto',
  },
  {
    hidden: false,
    status: 'custom',
    icon: './assets/icons/calc.png',
    component: 'CalcComponent',
    title: 'calculatrice',
    top: 5,
    left: 5,
    minWidth: '300px',
    minHeight: '400px',
    width: '300px',
    height: '400px',
  },
  {
    hidden: false,
    status: 'fullscreen',
    icon: './assets/icons/browser.png',
    component: 'BrowserComponent',
    title: 'navigateur',
    top: 5,
    left: 5,
    minWidth: '300px',
    minHeight: '400px',
    width: '500px',
    height: '500px',
  },
];

export const programsComponents = [
  SettingsComponent,
  CalcComponent,
  BrowserComponent,
];
