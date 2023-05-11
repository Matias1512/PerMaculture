import { Component } from '@angular/core';

type Item = {
  name: string;
  quantity: number;
};

type WarehouseParcel = {
  id: number;
  name: string;
  empty?: boolean;
};

@Component({
  selector: 'app-potager',
  templateUrl: './potager.component.html',
  styleUrls: ['./potager.component.scss']
})
export class PotagerComponent {
  parcels: WarehouseParcel[] = [];
  selectedParcel: WarehouseParcel | null = null;

  items: Item[] = [
    { name: 'Tomate', quantity: 10 },
    { name: 'Salade', quantity: 5 },
    { name: 'Carotte', quantity: 3 },
    { name: 'Radis', quantity: 2 },
    { name: 'Pomme de terre', quantity: 1 },
    { name: 'Poivron', quantity: 1 },
    { name: 'Aubergine', quantity: 1 },
    { name: 'Courgette', quantity: 1 },
    { name: 'Oignon', quantity: 1 },
  ];

  constructor() {
    for (let i = 0; i < 24; i++) {
      this.parcels.push({
        id: i,
        name: `Parcelle ${i}`
      });
    }
  }

  onClickParcel(parcel: WarehouseParcel) {
    this.selectedParcel = parcel;
    console.log(parcel);
  }
}
