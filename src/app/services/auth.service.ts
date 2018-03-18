import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
@Injectable()
export class AuthService {
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public user: FirebaseObjectObservable<any>;

  constructor(public af: AngularFireAuth, public db: AngularFireDatabase, private router: Router) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = db.object('Users/' + auth.uid);
        }
      });

    this.messages = db.list('messages');
    this.users = db.list('Users/');
  }
  // addUserInfo() {
  //   this.users.push({
  //     email: this.email,
  //     password: this.displayName,
  //     displayName: this.displayName
  //   });
  // }

  /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */
  // sendMessage(text) {
  //   const message = {
  //     message: text,
  //     displayName: this.displayName,
  //     email: this.email,
  //     timestamp: Date.now()
  //   };
  //   this.messages.push(message);
  // }

  /**
   *
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    return this.af.auth.createUserWithEmailAndPassword(
      email,
      password
    );
  }
  /**
   *
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  // saveUserInfoFromForm(uid, fullname, email, password) {
  //   return this.db.object('Users/' + uid).set({
  //     id: uid,
  //     username: fullname,
  //     email: email,
  //     avatar: null,
  //     displayName: fullname,
  //     password: password,
  //   });
  // }
  isLoggedIn() {
    if (this.user == null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    this.af.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }
}
