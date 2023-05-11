import {Component, OnInit} from '@angular/core';
import { Arbres } from '../models/arbres.interface';
import {MatDialog} from "@angular/material/dialog";
import {ArbresService} from "../services/arbres.service";
import {FlowerModalComponent} from "../flowers/flower-modal/flower-modal.component";

export interface DialogData {
  arbre: Arbres;
}

@Component({
  selector: 'app-arbes',
  templateUrl: './arbes.component.html',
  styleUrls: ['./arbes.component.scss']
})
export class Arbrescomponents  implements OnInit{

  arbres: Arbres[] = [];
  public Arbres: Arbres[] = [];

  constructor(private dialog: MatDialog, private service: ArbresService) {}

  ngOnInit(): void {
    this.showArbres();
  }

  openDialog(arbre: Arbres) {
    const dialogRef = this.dialog.open(FlowerModalComponent, {
      data: { arbres: arbre },
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
