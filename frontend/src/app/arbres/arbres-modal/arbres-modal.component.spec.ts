import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbresModalComponent } from './arbres-modal.component';

describe('ArbresModalComponent', () => {
  let component: ArbresModalComponent;
  let fixture: ComponentFixture<ArbresModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbresModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
