import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArbreModalComponent } from './add-arbre-modal.component';

describe('AddArbreModalComponent', () => {
  let component: AddArbreModalComponent;
  let fixture: ComponentFixture<AddArbreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArbreModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArbreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
