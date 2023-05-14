import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FlowersComponent } from './flowers/flowers.component';
import { FlowerModalComponent } from './flowers/flower-modal/flower-modal.component';
// import { AddFlowerModalComponent } from './flowers/add-flower-modal/add-flower-modal.component';
import { DeleteWarningFlowerComponent } from './flowers/delete-warning-flower/delete-warning-flower.component';
import { CardMeteoComponent } from './card-meteo/card-meteo.component';
import { ArbresModalComponent } from './arbres/arbres-modal/arbres-modal.component';
import { InsectesModalComponent } from './insectes/insectes-modal/insectes-modal.component';
import { DeleteWarningArbresComponent } from './arbres/delete-warning-arbres/delete-warning-arbres.component';
import { DeleteWarningInsectesComponent } from './insectes/delete-warning-insectes/delete-warning-insectes.component';
import { AddFlowerModalComponent } from './flowers/add-flower-modal/add-flower-modal.component';
import { AddArbreModalComponent } from './arbres/add-arbre-modal/add-arbre-modal.component';
import { AddInsecteModalComponent } from './insectes/add-insecte-modal/add-insecte-modal.component';
// import { ButtonAddComponent } from './button-add/button-add.component';
// import { MeteoComponent } from './meteo/meteo.component';

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
    LoadButtonComponent,
    DeleteWarningFlowerComponent,
    CardMeteoComponent,
    ArbresModalComponent,
    InsectesModalComponent,
    DeleteWarningArbresComponent,
    DeleteWarningInsectesComponent,
    AddFlowerModalComponent,
    AddArbreModalComponent,
    AddInsecteModalComponent,
    // ButtonAddComponent,
    // MeteoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
