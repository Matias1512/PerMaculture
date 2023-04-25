import { Component } from '@angular/core';
import { Insectes } from '../models/insectes.interface';


@Component({
  selector: 'app-insectes',
  templateUrl: './insectes.component.html',
  styleUrls: ['./insectes.component.scss']
})
export class InsectesComponent {

    insectes : Insectes[] = []
}
