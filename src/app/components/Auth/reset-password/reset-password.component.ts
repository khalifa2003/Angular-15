import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.resetPasswordForm.value.newPassword);
    }
  }
}
