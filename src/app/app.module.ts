import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

// Primng
import { MenubarModule } from 'primeng/menubar';
import { LandingComponent } from './landing/landing.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LandingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    GalleriaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
