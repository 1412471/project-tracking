import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Project } from '../../database/project';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import { MemberService } from '../../services/member.service';
import { ProjectService } from '../../services/project.service';
import { Member } from '../../database/member';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})

export class CreateProjectComponent implements OnInit {
  // projectCol: AngularFirestoreCollection<Project>;
  // project: Observable<Project[]>;

  // name: string;
  // description: string;
  // startDay: Date;
  // endDay: Date;
  // status: boolean; // true: working, false: done
  // progress: number;
  email: string;
  idMember: string[] = [];
  proj: Project = {
    id: '',
    name: '',
    idMember: [],
    idTask: [],
    description: '',
    status: true, // true: working, false: done
    progress: 0,
  };
  idProj: string;

  member: any;
  tem: string[] = [];
  added: string[] = [];
  selectable = true;
  removable = true;


  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  step = 0;

  nameControl = new FormControl('', [Validators.required]);
  dateFromControl = new FormControl('', [Validators.required]);
  dateToControl = new FormControl('', [Validators.required]);
  memberControl = new FormControl('', [Validators.required]);

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private memberService: MemberService,
    private projectService: ProjectService,
    public afAuth: AngularFireAuth) {
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

  addProject() {
    if (this.added.length > 0) {
      this.step++;
      this.projectService.addProject(this.proj)
        .then((data) => {
          this.projectService.getByID(data.id).subscribe((param) => {
            const proj = param;
            proj.id = data.id;
            this.projectService.updateProject(data.id, proj).subscribe((da) => {
              console.log(da);
            });
          });

          this.idMember.forEach(id => {
            let memUpdate: Member = {};
            this.memberService.getByID(id).subscribe((mem) => {
              memUpdate = mem;

            });

            setTimeout(() => {
              memUpdate.idProject.push(data.id);
              this.memberService.updateMember(id, memUpdate).subscribe(async (result) => {
                console.log(result);
                await this.router.navigate(['project-detail/' + data.id]);
              });
            }, 3000);

          });

        });
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
