import { Injectable } from '@angular/core';
import { Project } from '../database/project';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { MemberService } from './member.service';
import { Member } from '../database/member';
import { ServerValue } from '@firebase/database';
import * as firebase from 'firebase';
// import { PROJECTS } from '../database/mock-projects';

@Injectable()
export class ProjectService {
  projectCol: AngularFirestoreCollection<Project>;
  project: any;
  projectsDoc: AngularFirestoreDocument<Project>;
  proj: Observable<Project>;

  constructor(
    private afs: AngularFirestore) { }

  getAll(): Observable<any[]> {
    this.projectCol = this.afs.collection('project');
    return this.project = this.projectCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  getByID(id): Observable<any> {
    this.projectsDoc = this.afs.collection('project').doc(id);
    return this.projectsDoc.valueChanges();
  }

  deleteProject(id): Observable<any> {
    this.getByID(id).subscribe((dataProj) => {

      dataProj.idMember.forEach((idMem) => {
        let mem: Member = {};
        this.afs.collection('member').doc(idMem).valueChanges().subscribe((dataMem) => {
          console.log(dataMem);
          mem = dataMem;
          mem.idProject = mem.idProject.filter((param) => {
            return (param !== id);
          });
          console.log(mem.idProject);
          this.afs.doc('member/' + idMem).update(mem).catch((error) => console.log(error));
        });
      });

      dataProj.idTask.forEach((idTask) => {
        this.afs.doc('task/' + idTask).delete().catch((error) => console.log(error));
      });
    });

    this.afs.doc('project/' + id).delete().catch((error) => console.log(error));
    return this.getAll();
  }

  searchByName(start, end): Observable<any[]> {
    this.projectCol = this.afs.collection('project', ref => ref.orderBy('name').startAt(start).endAt(end));
    return this.projectCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  getAllByName(): Observable<any[]> {
    this.projectCol = this.afs.collection('project', ref => ref.orderBy('name'));
    return this.projectCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  updateProject(id, project): Observable<any> {
    project.time = Date.now();
    this.afs.doc('project/' + id).update(project).catch((error) => console.log(error));
    return this.getByID(id);
  }

  addProject(project) {
    console.log(Date.now());
    return this.afs.collection('project').add({
      'id': project.id,
      'name': project.name,
      'description': project.description,
      'startDay': project.startDay,
      'endDay': project.endDay,
      'idMember': project.idMember,
      'idTask': project.idTask,
      'status': project.status, // true: working, false: done
      'progress': project.progress,
      'time': Date.now()
    });
  }
}
