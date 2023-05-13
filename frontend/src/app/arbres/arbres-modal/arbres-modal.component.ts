import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../arbes.component';

@Component({
  selector: 'app-arbres-modal',
  templateUrl: './arbres-modal.component.html',
  styleUrls: ['./arbres-modal.component.scss']
})
export class ArbresModalComponent {
  constructor( 
    private dialog: MatDialogRef<ArbresModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, ) {}

  ngOnInit(): void {
  }
}
