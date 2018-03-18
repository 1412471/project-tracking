import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Task } from '../database/task';

@Injectable()
export class TaskService {
  taskCol: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  tasksDoc: AngularFirestoreDocument<Task>;
  task: Observable<Task>;

  constructor(private afs: AngularFirestore, ) { }

  getAll(): Observable<any[]> {
    this.taskCol = this.afs.collection('task');
    return this.taskCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  getByID(id): Observable<any> {
    this.tasksDoc = this.afs.collection('task').doc(id);
    return this.tasksDoc.valueChanges();
  }

  deleteTask(id): Observable<any> {
    this.afs.doc('task/' + id).delete().catch((error) => console.log(error));
    return this.getAll();
  }

  updateTask(id, task): Observable<any> {
    // this.memberCol = this.afs.collection('member/' + id);
    // this.memberCol.
    this.afs.doc('task/' + id).update(task);
    return this.getByID(id);
  }

  addTask(task) {
    return this.afs.collection('task').add({
      'id': task.id,
      'name': task.name,
      'description': task.description,
      'startDay': task.startDay,
      'endDay': task.endDay,
      'idMember': task.idMember,
      'status': task.status, // true: working, false: done
    });
  }
}
