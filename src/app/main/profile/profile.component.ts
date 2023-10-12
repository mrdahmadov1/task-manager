import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetUserData } from '../../store/user/profile.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserDataService } from '../../services/user.service';

@Component({
  selector: '.app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userEmail: string;
  userData: any;
  profileForm: FormGroup;
  role: string = '';

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private store: Store
  ) {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.profileForm = this.fb.group({
      username: '...',
      companyName: '...',
      firstName: '...',
      lastName: '...',
      address: '...',
      phoneNumber: '...',
    });
  }

  ngOnInit() {
    this.userDataService.getUserData(this.userEmail).subscribe((data) => {
      if (data && data.length > 0) {
        this.userData = data[0];
        this.role = this.userData.role; // Kullanıcının rolünü buradan alın
        if (this.role === 'admin') {
          this.profileForm.patchValue({
            username: this.userData.username,
            companyName: this.userData.companyName,
            phoneNumber: this.userData.phoneNumber,
            address: this.userData.address,
          });
        } else if (this.role === 'user') {
          this.profileForm.patchValue({
            username: this.userData.username,
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
          });
        }
      }
    });
  }

  onSave() {
    if (this.profileForm.valid) {
      const updatedUserData = { ...this.profileForm.value };
      this.userDataService
        .updateUserData(updatedUserData, this.userEmail)
        .then(() => {
          this.store.dispatch(SetUserData({ userData: updatedUserData }));
        })
        .catch((error) => {
          console.error('Update failed:', error);
        });
    }
  }
}
