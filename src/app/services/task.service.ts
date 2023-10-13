// task.service.ts

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private db: AngularFireDatabase) {}

  updateAssignedTo(taskId: string, assignedTo: string[]): Promise<void> {
    const taskRef = this.db.list('tasks', (ref) =>
      ref.orderByChild('id').equalTo(taskId)
    );

    return new Promise<void>((resolve, reject) => {
      taskRef
        .snapshotChanges()
        .pipe(first())
        .subscribe((action) => {
          const itemToUpdate = action[0].payload.key;
          if (itemToUpdate) {
            taskRef
              .update(itemToUpdate, { assignedTo: [...assignedTo] })
              .then(() => {
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          }
        });
    });
  }
}
