import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskdialogComponent } from './taskdialog.component';

describe('TaskdialogComponent', () => {
  let component: TaskdialogComponent;
  let fixture: ComponentFixture<TaskdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
