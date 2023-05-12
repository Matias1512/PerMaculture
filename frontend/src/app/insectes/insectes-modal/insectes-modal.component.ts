import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../insectes.component';

@Component({
  selector: 'app-insectes-modal',
  templateUrl: './insectes-modal.component.html',
  styleUrls: ['./insectes-modal.component.scss']
})
export class InsectesModalComponent implements OnInit {
  constructor( 
    private dialog: MatDialogRef<InsectesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, ) {}

  ngOnInit(): void {
  }
}
