import {Component, OnInit} from '@angular/core';
import { Insectes } from '../models/insectes.interface';
import {MatDialog} from "@angular/material/dialog";
import {BugsService} from "../services/bugs.service";
import {FlowerModalComponent} from "../flowers/flower-modal/flower-modal.component";


export interface DialogData {
  insect: Insectes;
}

@Component({
  selector: 'app-insectes',
  templateUrl: './insectes.component.html',
  styleUrls: ['./insectes.component.scss']
})
export class InsectesComponent implements OnInit{

    insectes : Insectes[] = []

  constructor(private dialog: MatDialog, private service: BugsService) {}


  ngOnInit(): void {
    this.showInsect();
  }

  openDialog(insect: Insectes) {
    const dialogRef = this.dialog.open(FlowerModalComponent, {
      data: { insectes: insect },
    });
  }

  showInsect() {
    this.service.getInsect().subscribe((insect) => {
      // Reorder arbre by alphabetical order
      insect
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
      this.insectes = insect;
    });
  }

  addSampleInsect() {
    console.log('Adding sample insect');
    this.service.postInsects().subscribe((insect) => {
      console.log('Added insect:', insect);
      this.showInsect();
    });
  }

  deletePlant(id: number) {
    this.service.deleteInsect(id).subscribe((insect) => {
      console.log('Deleted insect:', insect);
      this.showInsect();
    });
  }
  openDeleteDialog(insect: Insectes) {
    // Open a dialog to confirm deletion
    //  const dialogRef = this.dialog.open(DeleteWarningArbresComponent);

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.deletePlant(insect.id);
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
