import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-deleteproject-dialog',
  templateUrl: './deleteproject-dialog.component.html',
  styleUrls: ['./deleteproject-dialog.component.scss']
})
export class DeleteprojectDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteprojectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteProject() {
    const id = this.data.id;
    this.projectService.deleteProject(id).subscribe((data) => {
      console.log(data);
    });
  }

}
