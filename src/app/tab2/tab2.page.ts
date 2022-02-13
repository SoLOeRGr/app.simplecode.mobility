import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as AppComponent from '../app.component';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('gmap',{static: false}) gmapView: ElementRef;
  
  rootUrl = 'http://simplecoord.simplecode.gr/api_main/';

  tab = {
    title: 'Χάρτης'
  }

  romantso = {
    lat: '37.9823068302',
    lng: '23.7259935794'
  }

  locations:any = {};

  constructor( public http: HttpClient ) {
    this.asyncGetLocations().then( res => {
      this.locations = res;
      console.table( this.locations );
    });
  }

  asyncGetLocations() {
    const url = this.rootUrl + 'map_list.php';

    return new Promise( resolve => {
      this.http.get( url ).subscribe( data => {
        resolve( data );
      });
    });
  }

  ionViewDidEnter() {
    this.createGmap();
  }

  createGmap() {
    if( !AppComponent.isApp() ) {
      console.log( 'Cant run Native Gmaps on Browser!' );
      return;
    }
    
    const boundingRect = this.gmapView.nativeElement.getBoundingClientRect() as DOMRect;

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      latitude: Number(this.romantso.lat),
      longitude: Number(this.romantso.lng),
      zoom: 16
    });

    CapacitorGoogleMaps.addListener("onMapReady", async () => {

      CapacitorGoogleMaps.addMarker({
        latitude: Number(this.romantso.lat),
        longitude: Number(this.romantso.lng),
        title: "Romantso",
        snippet: "Fairly crowded",
      });

      CapacitorGoogleMaps.setMapType({
        "type": "normal"
      })
    });
  }
 
  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }
}
