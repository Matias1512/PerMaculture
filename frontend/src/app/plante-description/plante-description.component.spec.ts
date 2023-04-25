import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanteDescriptionComponent } from './plante-description.component';

describe('PlanteDescriptionComponent', () => {
  let component: PlanteDescriptionComponent;
  let fixture: ComponentFixture<PlanteDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanteDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanteDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
