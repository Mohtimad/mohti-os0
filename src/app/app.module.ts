import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DeskComponent } from './desk/desk.component';

import { WindowComponent } from './desk/window/window.component';
import { ProgramDirective } from './desk/window/program.directive';
import { SettingsComponent } from './programs/settings/settings.component';
import { CalcComponent } from './programs/calc/calc.component';
import { BrowserComponent } from './programs/browser/browser.component';

@NgModule({
  declarations: [
    AppComponent,
    DeskComponent,
    WindowComponent,
    ProgramDirective,
    SettingsComponent,
    CalcComponent,
    BrowserComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
