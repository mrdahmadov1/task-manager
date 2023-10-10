import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigninModel } from '../../models/sign-in.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css', '../sign-up/sign-up.component.css'],
})
export class SignInComponent {
  signinForm: FormGroup;
  model: SigninModel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.model = new SigninModel('', '');
    this.signinForm = this.fb.group({
      email: [this.model.email, [Validators.required, Validators.email]],
      password: [
        this.model.password,
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;

      this.authService
        .login(email, password)
        .then((userCredential) => {
          this.router.navigate(['/users']);
        })
        .catch((error) => {
          console.error('Sign in Failed:', error);
        });
    }
  }
}
