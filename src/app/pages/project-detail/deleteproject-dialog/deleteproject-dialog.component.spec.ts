import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteprojectDialogComponent } from './deleteproject-dialog.component';

describe('DeleteprojectDialogComponent', () => {
  let component: DeleteprojectDialogComponent;
  let fixture: ComponentFixture<DeleteprojectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteprojectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteprojectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
