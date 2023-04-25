import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlowersComponent} from "./flowers/flowers.component";
import {InsectesComponent} from "./insectes/insectes.component";
import { Arbrescomponents} from "./arbres/arbes.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {PotagerComponent} from "./potager/potager.component";

const routes: Routes = [
  {path: '' , redirectTo: 'plantes' , pathMatch: 'full'},
  {path: 'plantes' , component: FlowersComponent},
  {path: 'insectes' , component: InsectesComponent},
  {path: 'arbres' , component: Arbrescomponents},
  {path: 'potager' , component: PotagerComponent},
  {path: 'connexion' , component: ConnexionComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
