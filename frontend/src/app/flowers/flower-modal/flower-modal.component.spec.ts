import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerModalComponent } from './flower-modal.component';

describe('FlowerModalComponent', () => {
  let component: FlowerModalComponent;
  let fixture: ComponentFixture<FlowerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
