import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotagerComponent } from './potager.component';

describe('PotagerComponent', () => {
  let component: PotagerComponent;
  let fixture: ComponentFixture<PotagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
