import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MyTasksComponent } from './my-tasks/my-tasks.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'tasks', component: TasksComponent },
      { path: 'my-tasks', component: MyTasksComponent },
      { path: 'users', component: UsersComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    TasksComponent,
    UsersComponent,
    ProfileComponent,
    MyTasksComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule.forChild(mainRoutes),
  ],
})
export class MainModule {}
