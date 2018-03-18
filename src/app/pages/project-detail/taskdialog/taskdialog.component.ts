import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Task } from '../../../database/task';
import { Subject } from 'rxjs/Subject';
import { MemberService } from '../../../services/member.service';
import { ProjectService } from '../../../services/project.service';
import { TaskService } from '../../../services/task.service';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../../database/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taskdialog',
  templateUrl: './taskdialog.component.html',
  styleUrls: ['./taskdialog.component.scss']
})
export class TaskdialogComponent implements OnInit {

  task: Task = {
    id: '',
    name: '',
    idMember: [],
    description: '',
    status: true, // true: working, false: done
  };

  member: any;
  idMember: string[] = [];

  added: string[] = [];
  selectable = true;
  removable = true;

  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  email: string;

  nameControl = new FormControl('', [Validators.required]);
  dateFromControl = new FormControl('', [Validators.required]);
  dateToControl = new FormControl('', [Validators.required]);
  memberControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<TaskdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberService: MemberService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
  }

  getAllMember(): void {
    this.memberService.getAll().subscribe((data) => {
      this.member = data;
    });
  }

  search($event) {
    const q = $event.target.value;
    console.log(q);
    if (q === null || q === '') {
      this.getAllMember();
    }
    if (q && q !== '') {
      this.startAt.next(q);
      this.endAt.next(q + '\uf8ff');
      // this.memberService.getAllByEmail().subscribe((data) => { this.member = data; });
      Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
        this.memberService.searchByEmail(value[0], value[1]).subscribe((mem) => {
          if (this.idMember) {
            this.idMember.forEach(element => {
              mem = mem.filter((param) => {
                return (param.id !== element);
              });
            });
          }

          this.member = mem;

        });
      });
    }
  }

  select(mem) {
    this.added.push(mem.data.name);
    this.idMember.push(mem.id);
    this.task.idMember = this.idMember;
    this.email = '';
    this.member = [];
  }


  remove(item: any): void {
    const index = this.added.indexOf(item);

    if (index >= 0) {
      this.added.splice(index, 1);
      this.idMember.splice(index, 1);
      this.task.idMember = this.idMember;
    }
  }

  addTask() {
    if (this.nameControl.valid && this.dateFromControl.valid && this.dateToControl.valid && (this.added.length > 0)) {
      this.taskService.addTask(this.task)
        .then((data) => {
          this.taskService.getByID(data.id).subscribe((param) => {
            const task = param;
            task.id = data.id;
            this.taskService.updateTask(data.id, task).subscribe((da) => {
              console.log(da);
            });
          });

          let proj: Project = {};
          this.projectService.getByID(this.data.proj.id).subscribe((param) => {
            proj = param;

          });

          setTimeout(() => {
            proj.idTask.push(data.id);
            this.projectService.updateProject(this.data.proj.id, proj).subscribe((da) => {
              console.log(da);

            });

            window.location.reload();
          }, 3000);

        });

    }
  }
}
