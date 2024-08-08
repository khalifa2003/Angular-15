import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Primng
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/Home/landing/landing.component';
import { NavbarComponent } from './components/utils/navbar/navbar.component';
import { HomeComponent } from './components/Home/home Page/home.component';
import { FooterComponent } from './components/utils/footer/footer.component';
import { NotFoundComponent } from './components/utils/not-found/not-found.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { PasswordModule } from 'primeng/password';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LandingComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // ng prime
    MenubarModule,
    InputTextModule,
    ButtonModule,
    GalleriaModule,
    CardModule,
    CarouselModule,
    PasswordModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
