import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from '../store/user/profile.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'tasks', component: TasksComponent },
      { path: 'users', component: UsersComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [TasksComponent, UsersComponent, ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(mainRoutes),
  ],
})
export class MainModule {}
