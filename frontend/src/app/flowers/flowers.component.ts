import { Component } from '@angular/core';
import { Plant, PlantsService } from '../services/plants.service';

@Component({
  selector: 'app-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.scss']
})
export class FlowersComponent {
  plants: Plant[] = [];
  
  constructor(private plantService: PlantsService) {
    this.showPlants();
  }

  showPlants() {
    this.plantService.getPlants().subscribe((plants) => {
      this.plants = plants;
    });
  }
}
