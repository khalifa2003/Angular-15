import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  loading: boolean = false;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  get control() {
    return this.registerForm.controls;
  }

  submit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    if (
      this.registerForm.value.password ===
        this.registerForm.value.passwordConfirm &&
      this.registerForm.valid
    ) {
      this.authService.register(this.registerForm.value);
    }
  }
}
