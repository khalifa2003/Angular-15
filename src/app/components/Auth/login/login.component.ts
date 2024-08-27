import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
    private messageService: MessageService,
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
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((response) => {
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Welcome Back`,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: `Incorrect Email or Password`,
          });
        }
      });
    }
  }
}
