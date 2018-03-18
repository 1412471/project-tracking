import { Component, OnInit } from '@angular/core';
/* import { PROJECTS } from '../../database/mock-projects'; */
import { Project } from '../../database/project';
import { ProjectService } from '../../services/project.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, NavigationEnd } from '@angular/router';

// import { PROJECTS } from '../../database/mock-projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  project: any;

  // id: string;
  // name: string;
  // description: string;
  // startDay: Date;
  // endDay: Date;
  // status: boolean; // true: working, false: done
  // progress: number;
  // email: string;
  //  projects: Project[];
  isLoading = true;
  searchtext: string;

  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();


  p = 1;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
        console.log(user);
      }
    });
  }

  ngOnInit() {
    this.getAllProject();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  getAllProject(): void {
    this.projectService.getAll().subscribe(async (data) => {
      this.project = data;
      await (this.isLoading = false);
    });

  }

  search($event) {
    // this.searchtext = $event;

    const q = $event;
    if (q === null || q === '') {
      this.getAllProject();
    }
    if (q && q !== '') {
      this.startAt.next(q);
      this.endAt.next(q + '\uf8ff');
      // this.memberService.getAllByEmail().subscribe((data) => { this.member = data; });
      Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
        this.projectService.searchByName(value[0], value[1]).subscribe((proj) => {
          this.project = proj;
        });
      });
    }
  }

}
