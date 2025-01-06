import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, ToastModule],
})
export class VerifyResetCodeComponent {
  verificationCode: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  verifyCode() {
    if (this.verificationCode.length == 6) {
      this.authService
        .verifyResetCode(this.verificationCode)
        .subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: res.status,
            detail: res.message,
          });
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid Code Entered',
      });
    }
  }

  resendCode() {
    const email = localStorage.getItem('email')?.slice(1, -1) || '';
    if (email == '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please Enter Email',
      });
      this.router.navigate(['/login/forgotPassword']);
    } else {
      this.authService
        .forgotPassword(email)
        .pipe(
          catchError((error) => {
            // Handle the error here
            console.error('Error occurred:', error);

            this.messageService.add({
              severity: 'success',
              summary: error.status,
              detail: error.message,
            });
            // Optionally, return a new observable or a default value using of()
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
