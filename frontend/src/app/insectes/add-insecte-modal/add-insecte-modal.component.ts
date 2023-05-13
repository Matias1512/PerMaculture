import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogAddData } from '../insectes.component';

@Component({
  selector: 'app-add-insecte-modal',
  templateUrl: './add-insecte-modal.component.html',
  styleUrls: ['./add-insecte-modal.component.scss']
})
export class AddInsecteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddInsecteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAddData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
