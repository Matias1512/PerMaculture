import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMeteoComponent } from './card-meteo.component';

describe('CardMeteoComponent', () => {
  let component: CardMeteoComponent;
  let fixture: ComponentFixture<CardMeteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMeteoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
