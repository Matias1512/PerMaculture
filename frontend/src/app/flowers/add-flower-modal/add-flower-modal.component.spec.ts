import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlowerModalComponent } from './add-flower-modal.component';

describe('AddFlowerModalComponent', () => {
  let component: AddFlowerModalComponent;
  let fixture: ComponentFixture<AddFlowerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlowerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFlowerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
