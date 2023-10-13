import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserDataService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: [
    '../profile/profile.component.css',
    '../users/users.component.css',
    '../tasks/tasks.component.css',
    './my-tasks.component.css',
  ],
})
export class MyTasksComponent {
  tasks: any[] = [];
  colleagues: any[] = [];
  userEmail: string;

  constructor(
    private db: AngularFireDatabase,
    private userDataService: UserDataService
  ) {
    this.userEmail = localStorage.getItem('userEmail') || '';
  }

  ngOnInit() {
    this.getAllTasks();
    this.getColleagues();
  }

  getAllTasks() {
    this.db
      .list('tasks')
      .valueChanges()
      .subscribe((tasks: any[]) => {
        this.tasks = tasks.reverse();
      });
  }

  getColleagues() {
    this.userDataService.getUserData(this.userEmail).subscribe((data) => {
      this.db
        .list('users', (ref) =>
          ref.orderByChild('addedBy').equalTo(data[0].addedBy)
        )
        .valueChanges()
        .subscribe((colleagues: any[]) => {
          this.colleagues = colleagues;
        });
    });
  }
}
