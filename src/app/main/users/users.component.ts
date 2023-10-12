import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../profile/profile.component.css', './users.component.css'],
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  isAddUserModalOpen: boolean = false;
  users: any[] = [];
  adminUserEmail: string;

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.adminUserEmail = localStorage.getItem('userEmail') || '';
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.db
      .list('users', (ref) => ref.orderByChild('role').equalTo('user'))
      .valueChanges()
      .subscribe((users: any[]) => {
        this.users = users.filter(
          (user) => user.addedBy === this.adminUserEmail
        );
      });
  }

  openAddUserModal() {
    this.isAddUserModalOpen = true;
  }

  closeAddUserModal() {
    this.isAddUserModalOpen = false;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const { firstName, lastName, username, email, password } =
        this.userForm.value;

      const newUser = {
        firstName,
        lastName,
        username,
        email,
        password,
        role: 'user',
        addedBy: this.adminUserEmail,
      };

      this.authService
        .register(email, password)
        .then(({ user }) => {
          this.db.object(`users/${user?.uid}`).set(newUser);
        })
        .catch((error) => {
          console.error('Registration Failed:', error);
        })
        .catch((error) => {
          console.error('Registration Failed:', error);
        });

      this.userForm.reset();
    }
  }
}
