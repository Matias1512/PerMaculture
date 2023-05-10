import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FlowersComponent } from './flowers/flowers.component';
import { InsectesComponent } from './insectes/insectes.component';
import { Arbrescomponents} from './arbres/arbes.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PotagerComponent } from './potager/potager.component';
import { HttpClientModule } from '@angular/common/http';
import { FlowerModalComponent } from './flowers/flower-modal/flower-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DeleteWarningFlowerComponent } from './flowers/delete-warning-flower/delete-warning-flower.component';
import { CardMeteoComponent } from './card-meteo/card-meteo.component';
import { ButtonAddComponent } from './button-add/button-add.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MeteoComponent } from './meteo/meteo.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    FlowersComponent,
    InsectesComponent,
    Arbrescomponents,
    ConnexionComponent,
    PotagerComponent,
    FlowerModalComponent,
    DeleteWarningFlowerComponent,
    CardMeteoComponent,
    ButtonAddComponent,
    MeteoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
