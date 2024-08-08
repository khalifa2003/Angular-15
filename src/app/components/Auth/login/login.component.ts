import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get control() {
    return this.loginForm.controls;
  }

  submit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    if (
      this.loginForm.value.password === this.loginForm.value.passwordConfirm &&
      this.loginForm.valid
    ) {
      this.authService.login(this.loginForm.value);
    }
  }
}
