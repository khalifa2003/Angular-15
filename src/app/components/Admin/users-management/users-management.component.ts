import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { IUser } from 'src/app/Models/iuser';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
})
export class UsersManagementComponent {
  users: IUser[] = [];
  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User deleted successfully',
      });
    });
  }

  updateRole(id: string) {
    this.userService.makeManager(id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User role updated successfully',
      });
      this.getUsers();
    });
  }
}
