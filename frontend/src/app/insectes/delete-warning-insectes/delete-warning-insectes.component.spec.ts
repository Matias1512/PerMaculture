import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWarningInsectesComponent } from './delete-warning-insectes.component';

describe('DeleteWarningInsectesComponent', () => {
  let component: DeleteWarningInsectesComponent;
  let fixture: ComponentFixture<DeleteWarningInsectesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWarningInsectesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWarningInsectesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
