import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Member } from '../../database/member';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { Location } from '@angular/common';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DeletememberDialogComponent } from './deletemember-dialog/deletemember-dialog.component';
import { MatDialog } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../database/project';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  member: any;
  mem: Member = {};
  projectJoined = [];
  id: string;
  isLoading = true;


  // name: string;
  // gender: string;
  // city: string;
  // district: string;
  // mobile: string;
  // email: string;
  // dayOfBirth: Date;

  // name: string;
  // gender: string;
  // city: string;
  // district: string;
  // mobile: string;
  // email: string;
  // dayOfBirth: Date;

  // dateOfBirth = new FormControl(new Date());


  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private projectService: ProjectService,
    private location: Location,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    public afAuth: AngularFireAuth,
    private router: Router
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
    this.getAllMember();
    this.getMember();
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeletememberDialogComponent, {
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

  getAllMember(): void {
    this.memberService.getAll().subscribe((data) => {
      this.member = data;
    });
  }
  getMember() {
    this.memberService.getByID(this.id).subscribe((data) => {
      this.projectJoined = [];
      this.mem = data;
      data.idProject.forEach(id => {
        this.projectService.getByID(id).subscribe((project) => {
          this.projectJoined.push(project);
          console.log(this.projectJoined);
        });
        console.log(this.projectJoined);

      });
    });
    this.isLoading = false;
  }
}
