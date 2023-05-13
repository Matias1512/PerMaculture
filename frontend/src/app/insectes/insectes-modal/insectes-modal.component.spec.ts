import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsectesModalComponent } from './insectes-modal.component';

describe('InsectesModalComponent', () => {
  let component: InsectesModalComponent;
  let fixture: ComponentFixture<InsectesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsectesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsectesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
