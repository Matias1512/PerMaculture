import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Plant } from 'src/app/models/plant.interface';
import { DialogData } from '../flowers.component';

@Component({
  selector: 'app-flower-modal',
  templateUrl: './flower-modal.component.html',
  styleUrls: ['./flower-modal.component.scss']
})
export class FlowerModalComponent implements OnInit {
  constructor( 
    private dialog: MatDialogRef<FlowerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, ) {}

  ngOnInit(): void {
  }
} 
