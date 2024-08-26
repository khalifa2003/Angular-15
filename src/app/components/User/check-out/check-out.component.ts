import { UserService } from './../../../services/user.service';
import { AddressService } from 'src/app/services/address.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/Models/iuser';
import { MessageService } from 'primeng/api';
import { IAddress } from 'src/app/Models/iaddress';
import { ICart } from 'src/app/Models/icart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {
  listOfAddresses: IAddress[] = [];
  addressDialog: boolean = false;
  user: IUser = {} as IUser;
  addressForm: FormGroup;
  cart!: ICart;
  cartItems: any[] = [];

  constructor(
    private addressService: AddressService,
    private messageService: MessageService,
    private userService: UserService,
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      fname: [this.user.fname, Validators.required],
      lname: [this.user.lname, Validators.required],
      phone: [this.user.phone, Validators.required],
      address: ['', Validators.required],
      country: ['Egypt', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: [''],
    });
  }

  ngOnInit(): void {
    this.userService.getMe().subscribe((res) => {
      this.user = res;
    });
    this.cartService.getCart().subscribe((res) => {
      this.cart = res.data;
      this.cartItems = this.cart.cartItems;
    });
    this.getAddresses();
  }

  openNew() {
    this.addressDialog = true;
  }

  get f() {
    return this.addressForm.controls;
  }

  getAddresses() {
    this.addressService.getAddresses().subscribe((res) => {
      this.listOfAddresses = res.data;
    });
  }

  addAddress() {
    if (this.addressForm.valid) {
      this.addressService
        .addAddress(this.addressForm.value)
        .subscribe((res) => {
          this.getAddresses();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Address added Successfully`,
          });
          this.addressDialog = false;
          this.addressForm.reset();
        });
    }
  }

  deleteAddress(address: IAddress) {
    this.addressService.deleteAddress(address._id).subscribe((res) => {
      this.getAddresses();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Address removed Successfully`,
      });
    });
  }

  applyCoupon() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: `This Feature Under Progress`,
    });
  }
}
