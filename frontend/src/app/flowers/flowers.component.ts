import { Component } from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import { FlowerModalComponent } from './flower-modal/flower-modal.component';
import { PlantsService } from '../services/plants.service';
import { Plant } from '../models/plant.interface';

@Component({
  selector: 'app-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.scss']
})

export class FlowersComponent {
  plants: Plant[] = [];

  constructor(
    private dialog: MatDialog,
    private service: PlantsService
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(FlowerModalComponent);
  }

  showPlants() {
    this.service.getPlants().subscribe((plants) => {
      // Reorder plants by alphabetical order
      plants.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
      // Set plants to the sorted array
      this.plants = plants;
    });
  }
}
