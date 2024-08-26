import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/Models/iuser';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {
  userForm: FormGroup = new FormGroup({});
  user: IUser = {} as IUser;
  showModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private addressService: AddressService
  ) {}
  ngOnInit(): void {
    this.user = this.authService.currentUserValue.data;
    this.userForm = this.fb.group({
      fname: [this.user.fname, Validators.required],
      lname: [this.user.lname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.required],
      address: [, Validators.required],
      city: [, Validators.required],
      country: [, Validators.required],
      state: ['Alexandria', Validators.required],
      postalCode: [],
    });
  }
  get f() {
    return this.userForm.controls;
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    this.addressService.addAddress(this.userForm.value).subscribe((res) => {
      this.openModal();
      this.userForm.reset();
    });
  }
  // -------------------------------------------------
  addresses = ['01015388310 - Alexandria - شارع العوضي'];
  selectedAddress = this.addresses[0];
  newAddress = { mobile: '', city: '', address: '' };
  paymentMethod = 'cod';
  couponCode = '';
  shippingCost = 51;
  voucherDiscount = 0;

  cartItems = [
    {
      image: 'path/to/image1.jpg',
      name: 'Rahala RAL2209 laptop backpack 15.6-Inch With USB Charging Black',
      quantity: 1,
      unitPrice: 1225,
      points: 10,
      total: 1225,
    },
  ];

  get subTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

  get total() {
    return this.subTotal + this.shippingCost - this.voucherDiscount;
  }

  get totalPoints() {
    return this.cartItems.reduce((sum, item) => sum + item.points, 0);
  }

  addNewAddress() {
    const newAddr = `${this.newAddress.mobile} - ${this.newAddress.city} - ${this.newAddress.address}`;
    this.addresses.push(newAddr);
    this.selectedAddress = newAddr;
    this.newAddress = { mobile: '', city: '', address: '' };
  }

  applyCoupon() {
    // Logic for applying coupon
  }
}
