import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private db: AngularFireDatabase) {}

  getUserData(email: string): Observable<any> {
    return this.db
      .list('users', (ref) => ref.orderByChild('email').equalTo(email))
      .valueChanges();
  }

  updateUserData(updatedUserData: any, userEmail: string): Promise<void> {
    const userRef = this.db.list('users', (ref) =>
      ref.orderByChild('email').equalTo(userEmail)
    );

    return new Promise<void>((resolve, reject) => {
      userRef
        .snapshotChanges()
        .pipe(first())
        .subscribe((action) => {
          const itemToUpdate = action[0].payload.key;
          if (itemToUpdate) {
            userRef
              .update(itemToUpdate, updatedUserData)
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
