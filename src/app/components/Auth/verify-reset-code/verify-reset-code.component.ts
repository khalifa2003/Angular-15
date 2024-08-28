import { MessageService } from 'primeng/api';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css'],
})
export class VerifyResetCodeComponent {
  verificationCode: any;

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  verifyCode() {
    if (this.verificationCode.length == 6) {
      this.authService
        .verifyResetCode(this.verificationCode)
        .subscribe((res) => {});
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid Code',
      });
    }
  }

  resendCode() {
    const email = localStorage.getItem('email')?.slice(1, -1) || '';
    this.authService.forgotPassword(email).subscribe((res) => {});
  }
}
