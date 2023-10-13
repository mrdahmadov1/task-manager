import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserDataService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: [
    '../profile/profile.component.css',
    '../users/users.component.css',
    './tasks.component.css',
  ],
})
export class TasksComponent implements OnInit {
  taskForm: FormGroup;
  isAddTaskModalOpen: boolean = false;
  tasks: any[] = [];
  colleagues: any[] = [];
  userEmail: string;

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private userDataService: UserDataService,
    private taskService: TaskService
  ) {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllTasks();
    this.getColleagues();
  }

  // onAssignedToChange(event: any): void {
  //   this.taskService
  //     .updateAssignedTo('87c80ce9-a10b-44d9-a79d-5cc9bde8aaf4', event.value)
  //     .then(() => {});
  // }

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

  openAddTaskModal() {
    this.isAddTaskModalOpen = true;
  }

  closeAddTaskModal() {
    this.isAddTaskModalOpen = false;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const { title, description, deadline, status } = this.taskForm.value;

      const newTask = {
        id: uuidv4(),
        title,
        description,
        deadline,
        status,
      };

      this.db.list('tasks').push(newTask);
      this.taskForm.reset();
    }
  }
}
