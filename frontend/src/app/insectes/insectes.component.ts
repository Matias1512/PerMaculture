import {Component, OnInit} from '@angular/core';
import { Insectes } from '../models/insectes.interface';
import {MatDialog} from "@angular/material/dialog";
import {BugsService, PostInsects} from "../services/bugs.service";
import {FlowerModalComponent} from "../flowers/flower-modal/flower-modal.component";
import { DeleteWarningInsectesComponent } from './delete-warning-insectes/delete-warning-insectes.component';
import { InsectesModalComponent } from './insectes-modal/insectes-modal.component';
import { AddInsecteModalComponent } from './add-insecte-modal/add-insecte-modal.component';


export interface DialogData {
  insect: Insectes;
}

export interface DialogAddData {
  name: string;
  image_url: string;
  description: string;
  polinisateur: boolean;
}

@Component({
  selector: 'app-insectes',
  templateUrl: './insectes.component.html',
  styleUrls: ['./insectes.component.scss']
})
export class InsectesComponent implements OnInit{
  bugs: Insectes[] = []
  public insectes : Insectes[] = []
  name: string = "";
  image_url: string = "";
  description: string = ""; 
  polinisateur: boolean = false;

  constructor(private dialog: MatDialog, private service: BugsService) {}


  ngOnInit(): void {
    this.showInsect();
  }

  openDialog(bug: Insectes) {
    const dialogRef = this.dialog.open(InsectesModalComponent, {
      data: { insectes: bug },
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddInsecteModalComponent, {
      data: {name: this.name, animal: this.image_url, description: this.description, polinisateur : this.polinisateur},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Result : " + result.name);
      const bugs: PostInsects = {
        name: result.name,
        description: result.description,
        image_url: result.image_url,
        pollinator: result.polinisateur
      }
      if(result.name){
        this.service.postInsects(bugs).subscribe((bug) => {
        console.log('Added plant:', bug);
        this.showInsect();
        });
      }
      
    });
  }

  showInsect() {
    this.service.getInsect().subscribe((bugs) => {
      // Reorder arbre by alphabetical order
      bugs
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
          (insectes) =>
            true /* Set other filters here  */
        );
      this.insectes = bugs;
    });
  }

  addSampleInsect() {
    console.log('Adding sample insect');
    this.service.postInsects().subscribe((bugs) => {
      console.log('Added insect:', bugs);
      this.showInsect();
    });
  }

  deletePlant(id: number) {
    this.service.deleteInsect(id).subscribe((bugs) => {
      console.log('Deleted insect:', bugs);
      this.showInsect();
    });
  }
  openDeleteDialog(bugs: Insectes) {
    // Open a dialog to confirm deletion
     const dialogRef = this.dialog.open(DeleteWarningInsectesComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePlant(bugs.id);
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
