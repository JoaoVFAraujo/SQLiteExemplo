import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    dbProvider: DatabaseProvider) {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //Criando o banco de dados

      dbProvider.createDB()
        .then(() => {
          
          this.openHomePage(splashScreen)
        })
        .catch(() => {
          this.openHomePage(splashScreen)
        })
    });

  }

  openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = HomePage
  }
}
