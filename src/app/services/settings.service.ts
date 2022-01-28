import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private data: { [key: string]: any } = {
    backgroundActive: true,
    backgroundURL: 'assets/default.jpg',
    primaryColor: '#8400ff',
    secondaryColor: '#2d1742',
  };

  constructor() {}

  getBackgroundStyle() {
    if (this.data['backgroundActive']) {
      return { backgroundImage: `url("${this.data['backgroundURL']}")` };
    } else {
      return {
        backgroundImage: `linear-gradient(to top left, ${this.data['primaryColor']}, ${this.data['secondaryColor']})`,
      };
    }
  }

  setBackgroundURL(url: string) {
    this.data['backgroundURL'] = url;
  }

  getBackgroundURL() {
    return this.data['backgroundURL'];
  }

  getColor(key: 'primaryColor' | 'secondaryColor') {
    return this.data[key];
  }

  setColor(color: string, key: 'primaryColor' | 'secondaryColor') {
    this.data[key] = color;
  }

  setBackgroundActive(v: boolean) {
    this.data['backgroundActive'] = v;
  }

  isBackgroundActive() {
    return this.data['backgroundActive'];
  }
}
