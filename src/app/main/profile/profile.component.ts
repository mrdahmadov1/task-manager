import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { SetUserData } from 'src/app/auth/store/user/profile.actions';
import { selectUserData } from 'src/app/auth/store/user/profile.state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: '.app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userEmail: string | null;
  userData: string | unknown;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private store: Store
  ) {
    this.userEmail = localStorage.getItem('userEmail');
    this.profileForm = this.fb.group({
      companyName: ['...'],
      phoneNumber: ['...'],
      address: ['...'],
      username: ['...'],
    });
  }

  ngOnInit() {
    this.db
      .list('users', (ref) => ref.orderByChild('email').equalTo(this.userEmail))
      .valueChanges()
      .subscribe((data) => {
        if (data && data.length > 0) {
          this.userData = data[0];
          this.store.dispatch(SetUserData({ userData: this.userData }));
        }
      });

    this.store.select(selectUserData).subscribe((userData) => {
      this.userData = userData;
      this.profileForm.patchValue({
        companyName: userData?.companyName,
        phoneNumber: userData?.phoneNumber,
        address: userData?.address,
        username: userData?.username,
      });
    });
  }

  updateUserDataInDatabase(updatedUserData: any) {
    const userRef = this.db.list('users', (ref) =>
      ref.orderByChild('email').equalTo(this.userEmail)
    );

    userRef
      .snapshotChanges()
      .pipe(first())
      .subscribe((action) => {
        const itemToUpdate = action[0].payload.key;
        if (itemToUpdate) userRef.update(itemToUpdate, updatedUserData);
      });
  }

  onSave() {
    if (this.profileForm.valid) {
      const updatedUserData = { ...this.profileForm.value };
      this.updateUserDataInDatabase(updatedUserData);
      this.store.dispatch(SetUserData({ userData: updatedUserData }));
    }
  }
}
