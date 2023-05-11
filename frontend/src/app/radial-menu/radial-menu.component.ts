import { Component, ViewChild } from '@angular/core';

type MenuOption = {
  active: boolean;
  color: string;
  id: number;
  icon: string;
};

@Component({
  selector: 'app-radial-menu',
  templateUrl: './radial-menu.component.html',
  styleUrls: ['./radial-menu.component.scss']
})
export class RadialMenuComponent {
  isContextualMenuOpen = false;
  menuOptions: MenuOption[] = [
    { id: 0, color: '#ff2972', active: false, icon: 'home' },
    { id: 1, color: '#fee800', active: false, icon: 'home' },
    { id: 2, color: '#04fc43', active: false, icon: 'home' },
    { id: 3, color: '#fe00f1', active: false, icon: 'home' },
    { id: 4, color: '#00b0fe', active: false, icon: 'home' },
    { id: 5, color: '#fea600', active: false, icon: 'home' },
    { id: 6, color: '#00feff', active: false, icon: 'home' },
    { id: 7, color: '#ff4072', active: false, icon: 'home' },
  ]

  toggleActive() {
    this.isContextualMenuOpen = !this.isContextualMenuOpen;
    console.log('toggleActive: ', this.isContextualMenuOpen);
  }
}
