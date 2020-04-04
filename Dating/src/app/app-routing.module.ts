import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { PreventUnsavedGuard } from './guards/prevent-unsaved.guard';
import { ListResolver } from './resolvers/list.resolver';
import { MessagesResolver } from './resolvers/messages.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'members', component: MemberListComponent, canActivate: [AuthGuard], resolve: {users: MemberListResolver}  },
  { path: 'members/:id', component: MemberDetailsComponent, canActivate: [AuthGuard], resolve: {user: MemberDetailResolver} },
  { path: 'member/edit', component: MemberEditComponent,
     canActivate: [AuthGuard], canDeactivate: [PreventUnsavedGuard], resolve: {user: MemberEditResolver} },
  { path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver} },
  { path: 'lists', component: ListsComponent, resolve: {users: ListResolver}  },
  { path: '**', redirectTo: '' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
