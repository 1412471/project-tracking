import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../database/project';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  // valueName: string;
  // valueFrom: Date;
  // valueTo: Date;
  // valueDescription: string;
  // valueEmail: string;
  added: string[] = [];
  selectable = true;
  removable = true;


  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  id: string;
  email: string;
  idMember: string[] = [];
  member: any;

  nameControl = new FormControl('', [Validators.required]);
  dateFromControl = new FormControl('', [Validators.required]);
  dateToControl = new FormControl('', [Validators.required]);
  memberControl = new FormControl('', [Validators.required]);

  step = 0;

  @Input() proj: Project;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private memberService: MemberService,
    private location: Location,
    private afs: AngularFirestore,
    private router: Router,
    public afAuth: AngularFireAuth
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

    this.getProject();
    this.id = this.route.snapshot.paramMap.get('id');
  }

  getProject() {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getByID(id).subscribe((data) => {
      this.proj = data;
      this.idMember = this.proj.idMember;
      console.log(this.idMember);
      this.proj.idMember.forEach((idMem) => {
        this.memberService.getByID(idMem).subscribe((mem) => {
          this.added.push(mem.name);
          console.log(this.added);
        });
      });
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    if (this.nameControl.valid && this.dateFromControl.valid && this.dateToControl.valid) {
      this.step++;
    }

  }

  prevStep() {
    this.step--;
  }

  getAllMember(): void {
    this.memberService.getAll().subscribe((data) => {
      this.member = data;
    });
  }

  edit() {
    if (this.added.length > 0) {
      this.projectService.updateProject(this.id, this.proj).subscribe((data) => {
        console.log(data);
      });
      this.router.navigate(['project-detail/' + this.proj.id]);
    }
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
    this.proj.idMember = this.idMember;
    this.email = '';
    this.member = [];
  }


  remove(item: any): void {
    const index = this.added.indexOf(item);

    if (index >= 0) {
      this.added.splice(index, 1);
      this.idMember.splice(index, 1);
      this.proj.idMember = this.idMember;
    }
  }

}
