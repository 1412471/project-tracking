import { Component, OnInit } from '@angular/core';
import { Observable } from '@firebase/util';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { storage } from 'firebase/app';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<FileUploadComponent>) { }

  ngOnInit() {
  }
  startUpload(event: FileList) {
    const file = event[0];
    if (file.type.split('/')[0] !== 'image') {
      console.log('Unsupported');
      return;
    }
    const path = 'assets/${new Date().getTime()}_$(file.name)}';
  }
}
