import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWarningFlowerComponent } from './delete-warning-flower.component';

describe('DeleteWarningFlowerComponent', () => {
  let component: DeleteWarningFlowerComponent;
  let fixture: ComponentFixture<DeleteWarningFlowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWarningFlowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWarningFlowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
