import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CreateMemberComponent } from './pages/create-member/create-member.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';
import { MembersComponent } from './pages/members/members.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ImageUploadModule } from 'angular2-image-upload';
import { NgxPaginationModule } from 'ngx-pagination';

import { MemberService } from './services/member.service';
import { ProjectService } from './services/project.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
const config = {
  apiKey: 'AIzaSyAfGuOcV9zUOA93L9FlHadfH6E7HzbBbo8',
  authDomain: 'finalproject-e07b4.firebaseapp.com',
  databaseURL: 'https://finalproject-e07b4.firebaseio.com',
  projectId: 'finalproject-e07b4',
  storageBucket: 'finalproject-e07b4.appspot.com',
  messagingSenderId: '181294846524'
};
import { EditMemberComponent } from './pages/edit-member/edit-member.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { FooterComponent } from './share/templates/footer/footer.component';
import { HeaderComponent } from './share/templates/header/header.component';
import { SlideshowComponent } from './pages/home/slideshow/slideshow.component';
import { SearchboxComponent } from './share/templates/searchbox/searchbox.component';
import { DeletememberDialogComponent } from './pages/member-detail/deletemember-dialog/deletemember-dialog.component';
import { DeleteprojectDialogComponent } from './pages/project-detail/deleteproject-dialog/deleteproject-dialog.component';
import { TaskdialogComponent } from './pages/project-detail/taskdialog/taskdialog.component';
import { TaskService } from './services/task.service';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeletetaskDialogComponent } from './pages/project-detail/deletetask-dialog/deletetask-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateMemberComponent,
    CreateProjectComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MemberDetailComponent,
    MembersComponent,
    ProjectDetailComponent,
    ProjectsComponent,
    SlideshowComponent,
    SearchboxComponent,
    TaskdialogComponent,
    EditMemberComponent,
    EditProjectComponent,
    DeletememberDialogComponent,
    DeleteprojectDialogComponent,
    DeletetaskDialogComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ImageUploadModule.forRoot(),
    NgxPaginationModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule.enablePersistence(),
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    AuthService,
    MemberService,
    ProjectService,
    TaskService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DeletememberDialogComponent,
    DeleteprojectDialogComponent,
    TaskdialogComponent,
    DeletetaskDialogComponent
  ]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
