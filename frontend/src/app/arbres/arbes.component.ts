import {Component, OnInit} from '@angular/core';
import { Arbres } from '../models/arbres.interface';
import {MatDialog} from "@angular/material/dialog";
import {ArbresService} from "../services/arbres.service";
import {FlowerModalComponent} from "../flowers/flower-modal/flower-modal.component";
import { ArbresModalComponent } from './arbres-modal/arbres-modal.component';
import { DeleteWarningArbresComponent } from './delete-warning-arbres/delete-warning-arbres.component';

export interface DialogData {
  arbre: Arbres;
}

@Component({
  selector: 'app-arbes',
  templateUrl: './arbes.component.html',
  styleUrls: ['./arbes.component.scss']
})
export class Arbrescomponents  implements OnInit{

  trees: Arbres[] = [];
  public arbres: Arbres[] = [];

  constructor(private dialog: MatDialog, private service: ArbresService) {}

  ngOnInit(): void {
    this.showArbres();
  }

  openDialog(trees: Arbres) {
    const dialogRef = this.dialog.open(ArbresModalComponent, {
      data: { arbre: trees },
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
    console.log('Adding sample tree');
    this.service.postArbres().subscribe((trees) => {
      console.log('Added arbre:', trees);
      this.showArbres();
    });
  }

  deletePlant(id: number) {
    this.service.deleteArbre(id).subscribe((trees) => {
      console.log('Deleted arbre:', trees);
      this.showArbres();
    });
  }
  openDeleteDialog(trees: Arbres) {
    const dialogRef = this.dialog.open(DeleteWarningArbresComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePlant(trees.id);
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
