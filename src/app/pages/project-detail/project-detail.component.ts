import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Project } from '../../database/project';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Location } from '@angular/common';
import { MemberService } from '../../services/member.service';
import { Member } from '../../database/member';
import { DeleteprojectDialogComponent } from './deleteproject-dialog/deleteproject-dialog.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { TaskService } from '../../services/task.service';
import { Task } from '../../database/task';
import { DeletetaskDialogComponent } from './deletetask-dialog/deletetask-dialog.component';
import { TaskdialogComponent } from './taskdialog/taskdialog.component';




@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  members = [];
  tasks = [];
  mem = [];
  data = [];
  project: any;
  proj: Project = {};
  id: string;
  isLoading = true;
  checkColor: string;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private memberService: MemberService,
    private location: Location,
    public afAuth: AngularFireAuth,
    private router: Router,
    private taskService: TaskService,

  ) {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
        console.log(user);
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.getAllProject();
    this.getProject();
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteprojectDialogComponent, {
      width: '400px',
      data: {
        id: this.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      } else {
        // User clicked 'Cancel' or clicked outside the dialog
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TaskdialogComponent, {
      width: '600px',
      data: {
        proj: this.proj
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        // window.location.reload();
      } else {
        // User clicked 'Cancel' or clicked outside the dialog
      }
    });
  }

  openDeleteTaskDialog(task) {
    const dialogRef = this.dialog.open(DeletetaskDialogComponent, {
      width: '400px',
      data: {
        proj: this.proj,
        task: task
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      } else {
        // User clicked 'Cancel' or clicked outside the dialog
      }
    });
  }

  getAllProject(): void {
    this.projectService.getAll().subscribe((data) => {
      this.project = data;
    });
  }

  getProject() {
    this.isLoading = true;

    this.projectService.getByID(this.id).subscribe((data) => {
      this.proj = data;
      this.tasks = [];
      this.members = [];


      data.idMember.forEach(id => {
        let member: Member = {};
        this.memberService.getByID(id).subscribe((dataMem) => {
          member = dataMem;
        });
        setTimeout(() => {
          this.members.push(member);
        }, 3000);
      });

      if (data.idTask.length === 0) {
        this.isLoading = false;
      } else {
        this.tasks = [];
        data.idTask.forEach(id => {
          let tasks: Task = {};
          this.taskService.getByID(id).subscribe((task) => {
            tasks = task;
          });
          setTimeout(() => {
            this.tasks.push(tasks);
          }, 3000);

        });

        setTimeout(() => {
          this.data = [];

          this.tasks.forEach((param) => {
            const mem = [];
            param.idMember.forEach(da => {
              let tem: Member = {};
              this.memberService.getByID(da).subscribe((datamem) => {

                tem = datamem;
              });
              setTimeout(() => {
                mem.push(tem);
              }, 3000);

            });
            setTimeout(() => {
              this.isLoading = false;
              return this.data.push({ task: param, mem: mem });
            }, 3000);
          });
        }, 3000);

        // setTimeout(() => {

        // }, 3000);
      }




    });

  }

  checkTask(data) {
    this.isLoading = true;
    if (data.task.status) {
      data.task.status = false;

    } else {
      data.task.status = true;
    }
    this.taskService.updateTask(data.task.id, data.task).subscribe((task) => {
      console.log(task);
    });

    setTimeout(() => {
      let count = 0;
      this.tasks.forEach((task) => {
        if (!task.status) {
          count++;
        }
      });

      console.log(count);
      if (count === this.tasks.length) {
        this.proj.status = false;
        this.proj.progress = 100;
      } else {
        this.proj.status = true;
        this.proj.progress = count * 100 / this.tasks.length;
        console.log(this.proj.progress);
      }

      this.projectService.updateProject(this.id, this.proj).subscribe(async (proj) => {
        console.log(proj);
        await (this.isLoading = false);
      });
    }, 3000);

  }

  setMyStyles(data) {
    if (data.task.status) {
      this.checkColor = '#e1e1e1';
    } else {
      this.checkColor = '#5fba7d';
    }
    const styles = {
      'color': this.checkColor,
    };
    return styles;
  }


}




