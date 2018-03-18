import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { CreateMemberComponent } from './pages/create-member/create-member.component';
import { MembersComponent } from './pages/members/members.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';
import { EditMemberComponent } from './pages/edit-member/edit-member.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'new-project', component: CreateProjectComponent },
  { path: 'project-list', component: ProjectsComponent },
  { path: 'project-detail/:id', component: ProjectDetailComponent },
  { path: 'project-edit/:id', component: EditProjectComponent },
  { path: 'new-member', component: CreateMemberComponent },
  { path: 'member-list', component: MembersComponent },
  { path: 'member-detail/:id', component: MemberDetailComponent },
  { path: 'member-edit/:id', component: EditMemberComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
