import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { switchMap, tap } from 'rxjs';
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
    this.loadUserData();
  }

  loadUserData() {
    this.userService
      .getMe()
      .pipe(
        tap((user) => {
          this.user = user;
          this.changeProfileForm.patchValue({
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            phone: user.phone,
            image: user.image,
          });
        })
      )
      .subscribe();
  }

  saveProfile(): void {
    if (this.changeProfileForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields',
      });
      return;
    }

    this.userService
      .updateLoggedUserData(this.changeProfileForm.value)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Profile Updated',
          });
          this.changePasswordForm.reset();
        }),
        switchMap(() => this.userService.getMe()) // Reload user data
      )
      .subscribe((user) => {
        this.user = user;
        this.changeProfileForm.patchValue({
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          phone: user.phone,
          image: user.image,
        });
      });
  }

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields',
      });
      return;
    }
    if (
      this.changePasswordForm.value.password !==
      this.changePasswordForm.value.passwordConfirm
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
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Password Changed',
          });
          this.changePasswordForm.reset();
        }),
        switchMap(() => this.userService.getMe())
      )
      .subscribe((user) => {
        this.user = user;
        this.changeProfileForm.patchValue({
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          phone: user.phone,
          image: user.image,
        });
      });
  }
}
