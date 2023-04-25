import { Component } from '@angular/core';
import { Arbres } from '../models/arbres.interface';

@Component({
  selector: 'app-arbes',
  templateUrl: './arbes.component.html',
  styleUrls: ['./arbes.component.scss']
})
export class Arbrescomponents {

  arbres: Arbres[] = [];

}
