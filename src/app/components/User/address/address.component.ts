import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddress } from 'src/app/Models/iaddress';
import { IUser } from 'src/app/Models/iuser';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  userForm: FormGroup;
  addresses: IAddress[] = [];
  showModal: boolean = false;
  editingAddress: IAddress | null = null;

  cities: string[] = ['Alexandria', 'Cairo', 'Giza'];

  constructor(private fb: FormBuilder, private addressService: AddressService) {
    this.userForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: [''],
    });
  }

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses() {
    this.addressService.getAddresses().subscribe((res) => {
      this.addresses = res.data;
    });
  }

  openModal(address?: IAddress) {
    if (address) {
      this.editingAddress = address;
      this.userForm.patchValue(address);
    } else {
      this.editingAddress = null;
      this.userForm.reset();
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    if (this.editingAddress) {
      // Update address
      this.addressService
        .updateAddress(this.editingAddress._id, this.userForm.value)
        .subscribe(() => this.getAddresses());
    } else {
      // Add new address
      this.addressService
        .addAddress(this.userForm.value)
        .subscribe(() => this.getAddresses());
    }
    this.closeModal();
  }
  get f() {
    return this.userForm.controls;
  }

  deleteAddress(id: string) {
    this.addressService.deleteAddress(id).subscribe(() => {
      this.getAddresses();
    });
  }
}
