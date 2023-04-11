import { Component } from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import { FlowerModalComponent } from './flower-modal/flower-modal.component';

@Component({
  selector: 'app-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.scss']
})

export class FlowersComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FlowerModalComponent);
  }
}
