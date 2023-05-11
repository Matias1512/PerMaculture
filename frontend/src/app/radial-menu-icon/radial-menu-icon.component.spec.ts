import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialMenuIconComponent } from './radial-menu-icon.component';

describe('RadialMenuIconComponent', () => {
  let component: RadialMenuIconComponent;
  let fixture: ComponentFixture<RadialMenuIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadialMenuIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadialMenuIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
