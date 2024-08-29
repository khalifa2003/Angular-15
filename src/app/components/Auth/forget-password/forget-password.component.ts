import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, ButtonModule],
})
export class ForgetPasswordComponent {
  forgotPasswordForm!: FormGroup;
  emailError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.authService
        .forgotPassword(this.forgotPasswordForm.value.email)
        .pipe(
          catchError((error) => {
            console.error('Error occurred:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message,
            });
            return of(null);
          })
        )
        .subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: res.status,
            detail: res.message,
          });
        });
    }
  }
}
