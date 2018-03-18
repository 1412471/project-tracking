import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

  @Input('searchterm') searchterm: string;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
  }

  search($event) {
    this.change.emit(this.searchterm);
  }
}
