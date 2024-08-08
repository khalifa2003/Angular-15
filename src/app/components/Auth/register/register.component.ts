import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
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
      fname: ['Ahmad', Validators.required],
      lname: ['Khalifa', Validators.required],
      phone: [
        '01015388310',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      email: [
        'khalifa14112003@gamail.com',
        [Validators.required, Validators.email],
      ],
      password: ['012044', Validators.required],
      passwordConfirm: ['012044', Validators.required],
    });
  }

  get control() {
    return this.registerForm.controls;
  }

  submit() {
    if (
      this.registerForm.value.password ===
        this.registerForm.value.passwordConfirm &&
      this.registerForm.valid
    ) {
      this.authService
        .register(this.registerForm.value)
        .subscribe((response) => {
          if (response) {
            console.log('Registration successful');
          } else {
            console.error('Registration failed');
          }
        });
    }
  }
}
