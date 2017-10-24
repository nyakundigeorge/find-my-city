import { Component, ViewChild } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

import { CitiesService } from '../../providers/cities.service';
import { City } from '../../models/city.model';
import { GoogleMapComponent } from '../../components/google-map/google-map';
import { ILocation } from '../../models/location.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(GoogleMapComponent) fmcGoogleMap: GoogleMapComponent;

  jardimBotanico: ILocation = {
    name: 'Jardim Botânico', latitude: -25.442045, longitude: -49.241398
  };
  city: City;
  distance; number;
  myLocation: ILocation;

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder,
    public toaster: ToastController,
    public citiesService: CitiesService
  ) {

  }

  geolocate() {
    let options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.getCity(position);
    }).catch((err) => {
      alert(err);
    })
  }

  async getCity(pos: Geoposition) {
    let res: NativeGeocoderReverseResult = await this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude);
    //Apresentar na interface o Codigo Ibge e o Nome da Cidade
    const name = res.locality;
    this.city = await this.citiesService.findCityByName(name);
    
    let ibge = "NÃO ENCONTRADO";
    if (this.city) {
      ibge = this.city.ibge;
    }
    let toastr = this.toaster.create({
      message: `${name} IBGE: ${ibge}`,
      duration: 2000
    });
    this.myLocation = {
      name: name,
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    };
    toastr.present();
    this.addMarkers(pos.coords);
  }

  addMarkers(coords: Coordinates) {
    this.fmcGoogleMap.clear();
    this.fmcGoogleMap.goTo(coords.latitude, coords.longitude);
    this.fmcGoogleMap.addMarker(coords.latitude, coords.longitude, 'Eu', 'red');

    this.fmcGoogleMap.addMarker(this.jardimBotanico.latitude, this.jardimBotanico.longitude, this.jardimBotanico.name, 'green');
    this.fmcGoogleMap.drawLine(coords.latitude, coords.longitude, this.jardimBotanico.latitude, this.jardimBotanico.longitude)

    let km = this.fmcGoogleMap.computeDistanceBetween(coords.latitude, coords.longitude, this.jardimBotanico.latitude, this.jardimBotanico.longitude);
    this.distance = Math.round(km * 100) / 100;
  }

  onMapInit() {
    this.fmcGoogleMap.centerMyPosition();
  }


  centerPoint(location: ILocation) {
    this.fmcGoogleMap.goTo(location.latitude, location.longitude);
  }

}
