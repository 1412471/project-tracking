import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProjectService } from '../../services/project.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  project: any;
  isLoading = true;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private projectService: ProjectService, ) {
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

    this.getAllProject();
    // this.sortProject(this.project);
  }

  getAllProject(): void {
    this.projectService.getAll().subscribe((data) => {
      this.project = data;
    });
    setTimeout(() => {
      this.project = this.sortProject(this.project);
      this.isLoading = false;
    }, 3000);
  }

  sortProject(data: any[]): any {
    if (!data) {
      return null;
    }
    data.sort((obj1, obj2) => {
      return (obj2.data.time - obj1.data.time);
    });
    return data.slice(0, 3);
  }

}
