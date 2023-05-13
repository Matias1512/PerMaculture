import { DialogAddData, DialogData } from '../flowers.component';
import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Plant } from 'src/app/models/plant.interface';
import { PlantsService } from 'src/app/services/plants.service';

@Component({
  selector: 'app-add-flower-modal',
  templateUrl: './add-flower-modal.component.html',
  styleUrls: ['./add-flower-modal.component.scss']
})

export class AddFlowerModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddFlowerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAddData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
