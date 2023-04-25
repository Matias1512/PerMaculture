import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlowersComponent } from '../flowers.component';
import { Plant } from 'src/app/models/plant.interface';
import { PlantsService } from 'src/app/services/plants.service';

@Component({
  selector: 'app-delete-warning-flower',
  templateUrl: './delete-warning-flower.component.html',
  styleUrls: ['./delete-warning-flower.component.scss']
})

export class DeleteWarningFlowerComponent {

}
