import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../profile/profile.component.css'],
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

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
        // addedBy: adminUserId, // Eğer ekleyen admini belirlemek isterseniz, bu alanı kullanabilirsiniz.
      };

      // Kullanıcıyı Firebase veritabanına ekleyin
      this.db.list('users').push(newUser);

      // Formu sıfırlayın veya gerekirse kullanıcıya başka bir işlem yapma seçeneği sunun
      this.userForm.reset();
    }
  }
}
