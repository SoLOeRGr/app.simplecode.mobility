import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  rootUrl = 'https://simplecoord.simplecode.gr/api_main/';
  isApp: boolean;

  constructor( public platform: Platform ) {

    if( !this.platform.is('android') && !this.platform.is('ios') ) {
      this.isApp = false;
    } else {
      this.isApp = true;
    }

  }
}

export function isApp() {
  return this.isApp;
}

export function rootUrl() {
  return this.rootUrl;
}
