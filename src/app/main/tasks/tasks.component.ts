import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
  userEmail: string;

  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.db
      .list('tasks')
      .valueChanges()
      .subscribe((tasks: any[]) => {
        this.tasks = tasks;
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
