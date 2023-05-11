import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radial-menu-icon',
  templateUrl: './radial-menu-icon.component.html',
  styleUrls: ['./radial-menu-icon.component.scss'],
})
export class RadialMenuIconComponent {
  @Input() icon!: string;
}
