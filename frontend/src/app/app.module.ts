import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ConnexionComponent } from './connexion/connexion.component';

import { FlowersComponent } from './flowers/flowers.component';
import { InsectesComponent } from './insectes/insectes.component';
import { Arbrescomponents} from './arbres/arbes.component';
import { PotagerComponent } from './potager/potager.component';
import { FlowerModalComponent } from './flowers/flower-modal/flower-modal.component';

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
    FormsModule,
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
