import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/Models/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: IUser = {} as IUser;
  changeProfileForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });

    this.changeProfileForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      image: [''],
    });
  }

  ngOnInit() {
    this.getMe();
  }

  getMe() {
    this.userService.getMe().subscribe((res) => {
      this.user = res;
      this.changeProfileForm = this.fb.group({
        fname: [this.user.fname, Validators.required],
        lname: [this.user.lname, Validators.required],
        email: [this.user.email, Validators.required],
        phone: [this.user.phone, Validators.required],
        image: [this.user.image],
      });
    });
  }

  saveProfile(): void {
    this.userService
      .updateLoggedUserData(this.changeProfileForm.value)
      .subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Profile Updated',
        });
        this.changePasswordForm.reset();
        this.getMe();
      });
  }

  changePassword(): void {
    if (
      this.changePasswordForm.value.newPassword !==
      this.changePasswordForm.value.confirmNewPassword
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Passwords do not match',
      });
      this.changePasswordForm.reset();
      return;
    }

    this.userService
      .updateLoggedUserPassword(this.changePasswordForm.value)
      .subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Password Changed',
        });
        this.changePasswordForm.reset();
        this.getMe();
      });
  }
}
