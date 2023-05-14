import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsecteModalComponent } from './add-insecte-modal.component';

describe('AddInsecteModalComponent', () => {
  let component: AddInsecteModalComponent;
  let fixture: ComponentFixture<AddInsecteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInsecteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInsecteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
