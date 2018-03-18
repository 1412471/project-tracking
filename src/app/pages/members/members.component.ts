import { Component, OnInit, Input } from '@angular/core';
/* import { MEMBERS } from '../../database/mock-members'; */
import { MemberService } from '../../services/member.service';
import { Member } from '../../database/member';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  member: any;

  // name: string;
  // gender: string;
  // city: string;
  // district: string;
  // mobile: string;
  // email: string;
  isLoading = true;
  searchtext: string;

  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  p = 1;

  constructor(
    private memberService: MemberService,
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
    this.getAllMember();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  getAllMember(): void {
    this.memberService.getAll().subscribe(async (data) => {
      this.member = data;
      await (this.isLoading = false);
    });
  }

  search($event) {
    // this.searchtext = $event;

    const q = $event;
    if (q === null || q === '') {
      this.getAllMember();
    }
    if (q && q !== '') {
      this.startAt.next(q);
      this.endAt.next(q + '\uf8ff');
      // this.memberService.getAllByEmail().subscribe((data) => { this.member = data; });
      Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
        this.memberService.searchByEmail(value[0], value[1]).subscribe((mem) => {
          this.member = mem;
        });
      });
    }
  }




  // getMember(memberId) {
  //   this.memberDoc = this.afs.doc('member/'+memberId);
  //   this.mem = this.memberDoc.valueChanges();
  // }
  // getAll(): void{
  //   this.memberService.getAll().then(data => this.member = data);
  // }

  /*   getAll(): void{
      this.memberService.getAll().then(data => this.members = data);
    }

    delete(id: number) : void{
      this.memberService.delete(id).then(() => {
        return this.getAll();
      })
    } */

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   var newBook = new Book;
  //   newBook.id = this.id++;
  //   newBook.name = name;
  //   this.bookService.add(newBook).then();
  // }
}
