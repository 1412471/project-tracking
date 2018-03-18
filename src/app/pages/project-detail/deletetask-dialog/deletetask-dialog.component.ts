import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from '../../../services/project.service';
import { TaskService } from '../../../services/task.service';
import { Project } from '../../../database/project';

@Component({
  selector: 'app-deletetask-dialog',
  templateUrl: './deletetask-dialog.component.html',
  styleUrls: ['./deletetask-dialog.component.scss']
})
export class DeletetaskDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletetaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private taskService: TaskService, ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteTask() {
    const idTask = this.data.task.id;
    let proj: Project = {};
    this.projectService.getByID(this.data.proj.id).subscribe((dataProj) => {
      proj = dataProj;
      proj.idTask = dataProj.idTask.filter((param) => {
        return (param !== idTask);
      });
      this.projectService.updateProject(this.data.proj.id, proj).subscribe((update) => {
        console.log(update);
      });
    });

    this.taskService.deleteTask(idTask).subscribe((data) => {
      console.log(data);
    });
  }

}
