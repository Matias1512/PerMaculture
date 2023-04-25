import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-flower-modal',
  templateUrl: './flower-modal.component.html',
  styleUrls: ['./flower-modal.component.scss']
})
export class FlowerModalComponent {
  constructor( private dialog: MatDialogRef<FlowerModalComponent> ) {}
}
