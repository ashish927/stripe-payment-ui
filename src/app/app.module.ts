import { PaymentMessagePage } from './payment-message/payment-message.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Stripe } from '@ionic-native/stripe/ngx';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { PaymentMessagePageModule } from './payment-message/payment-message.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [PaymentMessagePage],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PaymentMessagePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Stripe,
    HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
