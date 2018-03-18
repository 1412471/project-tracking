import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MemberService } from '../../../services/member.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deletemember-dialog',
  templateUrl: './deletemember-dialog.component.html',
  styleUrls: ['./deletemember-dialog.component.scss']
})
export class DeletememberDialogComponent implements OnInit {

  member: any;

  constructor(
    public dialogRef: MatDialogRef<DeletememberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberService: MemberService,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteMember() {
    const id = this.data.id;
    this.memberService.deleteMember(id).subscribe((data) => {
      console.log(data);
    });
  }
}

