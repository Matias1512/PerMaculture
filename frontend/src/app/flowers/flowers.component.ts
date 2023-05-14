import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FlowerModalComponent } from './flower-modal/flower-modal.component';
import { PlantsService, PostPlant } from '../services/plants.service';
import { Plant } from '../models/plant.interface';
import { DeleteWarningFlowerComponent } from './delete-warning-flower/delete-warning-flower.component';
import { AddFlowerModalComponent } from './add-flower-modal/add-flower-modal.component';

const PLANT_TYPES = {};

export interface DialogData {
  flower: Plant;
}

export interface DialogAddData {
  name: string;
  image_url: string;
  description: string;
}

@Component({
  selector: 'app-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.scss'],
})
export class FlowersComponent implements OnInit {
  plants: Plant[] = [];
  public flowers: Plant[] = [];
  name: string = "";
  image_url: string = "";
  description: string = "";

  constructor(private dialog: MatDialog, private service: PlantsService) {}

  ngOnInit(): void {
    this.showPlants();
  }

  openDialog(plant: Plant) {
    const dialogRef = this.dialog.open(FlowerModalComponent, {
      data: { flower: plant },
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddFlowerModalComponent, {
      data: {name: this.name, animal: this.image_url, description: this.description},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Result : " + result.name);
      const plant: PostPlant = {
        name: result.name,
        description: result.description,
        image_url: result.image_url
      }
      if(result.name){
        this.service.postPlant(plant).subscribe((plant) => {
        console.log('Added plant:', plant);
        this.showPlants();
        });
      }
      
    });
  }

  showPlants() {
    this.service.getPlants().subscribe((plants) => {
      // Reorder plants by alphabetical order
      plants
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        })
        .filter(
          (plant) =>
            true /* Set other filters here (ex. plant.type === PLANT_TYPES.FLOWER) */
        );
      this.flowers = plants;
    });
  }

  addSamplePlant() {
    console.log('Adding sample plant');
    this.service.postPlant().subscribe((plant) => {
      console.log('Added plant:', plant);
      this.showPlants();
    });
  }

  deletePlant(id: number) {
    this.service.deletePlant(id).subscribe((plant) => {
      console.log('Deleted plant:', plant);
      this.showPlants();
    });
  }

  openAddDialog() {}

  openDeleteDialog(plant: Plant) {
    // Open a dialog to confirm deletion
    const dialogRef = this.dialog.open(DeleteWarningFlowerComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePlant(plant.id);
      }
    });
  }

  verifyImageURL(url: string): string {
    // Perform a GET request to the URL to verify it exists
    // If not, return an empty string
    // Else, return the URL
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          return '';
        } else {
          return url;
        }
      })
      .then((url) => {
        return url;
      })
      .catch((error) => {
        return '';
      });

    return url;
  }
}
