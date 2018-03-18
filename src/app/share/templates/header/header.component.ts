import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
  }
}
