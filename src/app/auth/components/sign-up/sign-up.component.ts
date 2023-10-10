import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupModel } from '../../models/sign-up.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signupForm: FormGroup;
  model: SignupModel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.model = new SignupModel('', '', '', '', '', '');
    this.signupForm = this.fb.group({
      companyName: [this.model.companyName, Validators.required],
      phoneNumber: [this.model.phoneNumber, Validators.required],
      address: [this.model.address, Validators.required],
      username: [this.model.username, Validators.required],
      email: [this.model.email, [Validators.required, Validators.email]],
      password: [
        this.model.password,
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;

      this.authService
        .register(email, password)
        .then((userCredential) => {
          this.router.navigate(['/users']);
        })
        .catch((error) => {
          console.error('Registration Failed:', error);
        });
    }
  }
}
