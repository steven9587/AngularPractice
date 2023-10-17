import { NotfoundComponent } from './notfound/notfound.component';
import { TodoComponent } from './manage/todo/todo.component';
import { HomeComponent } from './manage/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { 
    path: 'manage', 
    component: ManageComponent, 
    children: [
      { path: 'home', component: HomeComponent }, 
      { path: 'todo', component: TodoComponent },
      { path: '',   redirectTo: 'home', pathMatch: 'full' },
    ]
  }, 
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
