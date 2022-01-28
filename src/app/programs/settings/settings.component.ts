import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  primaryColor = this._settings.getColor('primaryColor');
  secondaryColor = this._settings.getColor('secondaryColor');
  backgroundActive = this._settings.isBackgroundActive();
  backgroundURL = this._settings.getBackgroundURL();

  constructor(private _settings: SettingsService) {}

  ngOnInit(): void {}

  onSubmit(form: any) {
    this._settings.setColor(form['primaryColor'].value, 'primaryColor');
    this._settings.setColor(form['secondaryColor'].value, 'secondaryColor');
    this._settings.setBackgroundActive(form['backgroundActive'].checked);
    if (form['backgroundActive'].checked) {
      console.log(form['backgroundURL'].value);
      this._settings.setBackgroundURL(form['backgroundURL'].value);
    }
  }
}
