import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GoogleMapsEvent, GoogleMap } from '@ionic-native/google-maps';

@Component({
  selector: 'fmc-google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent implements AfterViewInit {
  @Input() id: string = 'GoogleMap';
  @Input() height: string = '100%';
  @Input() width: string = '100%';
  @Output() init: EventEmitter<GoogleMap> = new EventEmitter<GoogleMap>();

  public map: GoogleMap;

  constructor(private platform: Platform) { }

  ngAfterViewInit(): void {
    this.platform.ready()
      .then(() => {
        this.map = new GoogleMap(this.id);
        this.map.one(GoogleMapsEvent.MAP_READY)
          .then(() => {
            this.init.emit(this.map);
          }
          )
      });
  }

  goTo(latitude: number, longitude: number) {
    this.map.animateCamera({
      target: { lat: latitude, lng: longitude },
      zoom: 13,
      tilt: 0,
      bearing: 0,
      duration: 2000
    });
  }

  addMarker(latitude: number, longitude: number, title: string, color: string) {
    this.map.addMarker({
      title: title,
      icon: color,
      animation: 'DROP',
      position: {
        lat: latitude,
        lng: longitude
      }
    })
  }

  clear() {
    // Esiste um bug no componente
    //this.map.clear();
  }

  drawLine(latitudeA: number, longitudeA: number, latitudeB: number, longitudeB: number) {
    this.map.addPolyline({
      color: 'black',
      width: 1,
      points: [{ lat: latitudeA, lng: longitudeA }, { lat: latitudeB, lng: longitudeB }]
    })
  }

  computeDistanceBetween(latitudeA: number, longitudeA: number, latitudeB: number, longitudeB: number) {
    const R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(latitudeB - latitudeA);  // deg2rad below
    let dLon = this.deg2rad(longitudeB - longitudeA);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(latitudeA)) * Math.cos(this.deg2rad(latitudeB)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }

  private deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  async centerMyPosition() {
    const location = await this.map.getMyLocation();
    this.map.moveCamera({
      zoom: 9,
      target: location.latLng
    });
  }
}

