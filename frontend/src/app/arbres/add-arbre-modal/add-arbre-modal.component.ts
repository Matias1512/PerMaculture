import { Component, Inject } from '@angular/core';
import { DialogAddData } from '../arbes.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-arbre-modal',
  templateUrl: './add-arbre-modal.component.html',
  styleUrls: ['./add-arbre-modal.component.scss']
})
export class AddArbreModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddArbreModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAddData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
