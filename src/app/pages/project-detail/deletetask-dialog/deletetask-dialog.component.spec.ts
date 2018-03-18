import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetaskDialogComponent } from './deletetask-dialog.component';

describe('DeletetaskDialogComponent', () => {
  let component: DeletetaskDialogComponent;
  let fixture: ComponentFixture<DeletetaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletetaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletetaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
