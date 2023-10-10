import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';

const mainRoutes: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'users', component: UsersComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  declarations: [TasksComponent, UsersComponent, ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(mainRoutes)],
})
export class MainModule {}
