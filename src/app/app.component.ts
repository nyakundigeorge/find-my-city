import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { DataService } from '../providers/data.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dataService: DataService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      dataService.prepareDatabase().then(() => {
        // fechando a SplashScreen somente quando o banco for criado
        splashScreen.hide();
      })
        .catch(() => {
          // ou se houver erro na criação do banco

        });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


    });
  }
}
