import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWarningArbresComponent } from './delete-warning-arbres.component';

describe('DeleteWarningArbresComponent', () => {
  let component: DeleteWarningArbresComponent;
  let fixture: ComponentFixture<DeleteWarningArbresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWarningArbresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWarningArbresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
