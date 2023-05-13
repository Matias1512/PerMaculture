import {Component, OnInit} from '@angular/core';
import { Arbres } from '../models/arbres.interface';
import {MatDialog} from "@angular/material/dialog";
import {ArbresService, PostArbres} from "../services/arbres.service";
import {FlowerModalComponent} from "../flowers/flower-modal/flower-modal.component";
import { AddArbreModalComponent } from './add-arbre-modal/add-arbre-modal.component';

export interface DialogData {
  arbre: Arbres;
}

export interface DialogAddData {
  name: string;
  image_url: string;
  description: string;
}

@Component({
  selector: 'app-arbes',
  templateUrl: './arbes.component.html',
  styleUrls: ['./arbes.component.scss']
})
export class Arbrescomponents  implements OnInit{
  trees: Arbres[] = [];
  public arbres: Arbres[] = [];
  name: string = "";
  image_url: string = "";
  description: string = "";

  constructor(private dialog: MatDialog, private service: ArbresService) {}

  ngOnInit(): void {
    this.showArbres();
  }

  openDialog(arbre: Arbres) {
    const dialogRef = this.dialog.open(FlowerModalComponent, {
      data: { arbres: arbre },
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddArbreModalComponent, {
      data: {name: this.name, animal: this.image_url, description: this.description},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Result : " + result.name);
      const plant: PostArbres = {
        name: result.name,
        description: result.description,
        image_url: result.image_url
      }
      if(result.name){
        this.service.postArbres(plant).subscribe((plant) => {
        console.log('Added plant:', plant);
        this.showArbres();
        });
      }

    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddArbreModalComponent, {
      data: {name: this.name, animal: this.image_url, description: this.description},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Result : " + result.name);
      const plant: PostArbres = {
        name: result.name,
        description: result.description,
        image_url: result.image_url
      }
      if(result.name){
        this.service.postArbres(plant).subscribe((plant) => {
        console.log('Added plant:', plant);
        this.showArbres();
        });
      }

    });
  }

  showArbres() {
    this.service.getArbres().subscribe((arbres) => {
      // Reorder arbre by alphabetical order
      arbres
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
          (arbres) =>
            true /* Set other filters here  */
        );
      this.arbres = arbres;
    });
  }

  addSampleArbre() {
    console.log('Adding sample arbre');
    this.service.postArbres().subscribe((arbre) => {
      console.log('Added arbre:', arbre);
      this.showArbres();
    });
  }

  deletePlant(id: number) {
    this.service.deleteArbre(id).subscribe((arbre) => {
      console.log('Deleted arbre:', arbre);
      this.showArbres();
    });
  }
  openDeleteDialog(arbre: Arbres) {
    // Open a dialog to confirm deletion
  //  const dialogRef = this.dialog.open(DeleteWarningArbresComponent);

   // dialogRef.afterClosed().subscribe((result) => {
   //   if (result) {
   //     this.deletePlant(plant.id);
     // }
  //  });
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
