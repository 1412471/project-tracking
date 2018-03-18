import { Injectable } from '@angular/core';
import { Member } from '../database/member';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from './project.service';
import { Project } from '../database/project';
/* import { MEMBERS } from '../database/mock-members'; */

@Injectable()
export class MemberService {
  memberCol: AngularFirestoreCollection<Member>;
  member: Observable<Member[]>;
  membersDoc: AngularFirestoreDocument<Member>;
  mem: Observable<Member>;

  constructor(
    private afs: AngularFirestore, ) { }

  getAll(): Observable<any[]> {
    this.memberCol = this.afs.collection('member');
    return this.memberCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Member;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  getByID(id): Observable<any> {
    this.membersDoc = this.afs.collection('member').doc(id);
    return this.membersDoc.valueChanges();
  }

  deleteMember(id): Observable<any> {
    this.getByID(id).subscribe((dataMem) => {
      dataMem.idProject.forEach((idProj) => {
        let proj: Project = {};
        this.afs.collection('project').doc(idProj).valueChanges().subscribe((dataProj) => {
          console.log(dataProj);
          proj = dataProj;
          proj.idMember = proj.idMember.filter((param) => {
            return (param !== id);
          });
          console.log(proj.idMember);
          this.afs.doc('project/' + idProj).update(proj).catch((error) => console.log(error));
        });
      });
    });

    this.afs.doc('member/' + id).delete().catch((error) => console.log(error));
    return this.getAll();
  }

  searchByEmail(start, end): Observable<any[]> {
    this.memberCol = this.afs.collection('member', ref => ref.orderBy('email').startAt(start).endAt(end));
    return this.memberCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Member;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  getAllByEmail(): Observable<any[]> {
    this.memberCol = this.afs.collection('member', ref => ref.orderBy('email'));
    return this.memberCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Member;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  updateMember(id, member): Observable<any> {
    // this.memberCol = this.afs.collection('member/' + id);
    // this.memberCol.
    this.afs.doc('member/' + id).update(member);
    return this.getByID(id);
  }

  addMember(member) {
    return this.afs.collection('member').add({
      'id': member.id,
      'name': member.name,
      'city': member.city,
      'gender': member.gender,
      'district': member.district,
      'address': member.address,
      'mobile': member.mobile,
      'email': member.email,
      'dayOfBirth': member.dayOfBirth,
      'idProject': member.idProject,
    });
  }

}
