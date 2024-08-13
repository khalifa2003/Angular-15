import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IBrand } from 'src/app/Models/ibrand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.css'],
})
export class BrandManagementComponent {
  brandDialog: boolean = false;
  brands: IBrand[] = [];
  brand: IBrand = {} as IBrand;
  brandForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private messageService: MessageService
  ) {
    this.getbrands();

    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image: ['', Validators.required],
    });
  }

  openNew() {
    this.brand = {} as IBrand;
    this.brandForm.reset();
    this.brandDialog = true;
  }

  openEdit(brand: IBrand) {
    this.brand = brand;
    this.brandForm = this.fb.group({
      name: [brand.name, Validators.required],
      description: [brand.description],
      image: [brand.image, Validators.required],
    });

    this.brandDialog = true;
  }

  get f() {
    return this.brandForm.controls;
  }

  getbrands() {
    this.brandService.getAllBrands().subscribe((res) => {
      this.brands = res;
      console.log(res);
    });
  }

  submitAddBrand() {
    if (this.brandForm.valid) {
      this.brandService.createBrand(this.brandForm.value).subscribe((res) => {
        this.getbrands();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${this.brandForm.value.name} added Successfully`,
        });
        this.brandDialog = false;
        this.brandForm.reset();
      });
    }
  }

  submitEditBrand() {
    if (this.brandForm.valid) {
      this.brandService
        .editBrand(this.brand._id, this.brandForm.value)
        .subscribe((res) => {
          this.getbrands();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `'${this.brandForm.value.name}' edited Successfully`,
          });
          this.brandDialog = false;
          this.brandForm.reset();
          this.brand = {} as IBrand;
        });
    }
  }

  deleteBrand(brand: IBrand) {
    this.brandService.deleteBrand(brand._id).subscribe((res) => {
      this.getbrands();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `'${this.brandForm.value.name}' removed Successfully`,
      });
    });
  }

  @ViewChild('dt') dt: Table = {} as Table;
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';
    this.dt.filterGlobal(value, 'contains');
  }
}
