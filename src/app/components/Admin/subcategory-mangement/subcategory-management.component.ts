import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ICategory } from 'src/app/Models/icategory';
import { ISubcategory } from 'src/app/Models/isubcategory';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-subcategory-management',
  templateUrl: './subcategory-management.component.html',
  styleUrls: ['./subcategory-management.component.css'],
})
export class SubcategoryManagementComponent {
  subcategoryDialog: boolean = false;
  subcategories: ISubcategory[] = [];
  subcategory: ISubcategory = {} as ISubcategory;
  subcategoryForm: FormGroup;
  categories: ICategory[] = [];

  constructor(
    private fb: FormBuilder,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {
    this.getSubcategories();
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
    this.subcategoryForm = fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  openNew() {
    this.subcategory = {} as ISubcategory;
    this.subcategoryForm.reset();
    this.subcategoryDialog = true;
  }

  openEdit(subcategory: ISubcategory) {
    this.subcategory = subcategory;
    this.subcategoryForm = this.fb.group({
      name: [subcategory.name, Validators.required],
      category: [subcategory.category._id, Validators.required],
    });

    this.subcategoryDialog = true;
  }

  get f() {
    return this.subcategoryForm.controls;
  }

  getSubcategories() {
    this.subcategoryService.getSubcategories().subscribe((res) => {
      this.subcategories = res;
    });
  }

  submitAddSubcategory() {
    if (this.subcategoryForm.valid) {
      this.subcategoryService
        .createSubcategory(this.subcategoryForm.value)
        .subscribe((res) => {
          this.getSubcategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.subcategoryForm.value.name} added Successfully`,
          });
          this.subcategoryDialog = false;
          this.subcategoryForm.reset();
          this.subcategory = {} as ISubcategory;
        });
    }
  }

  submitEditSubcategory() {
    if (this.subcategoryForm.valid) {
      this.subcategoryService
        .editSubcategory(this.subcategory._id, this.subcategoryForm.value)
        .subscribe((res) => {
          this.getSubcategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `'${this.subcategoryForm.value.name}' edited Successfully`,
          });
          this.subcategoryDialog = false;
          this.subcategoryForm.reset();
          this.subcategory = {} as ISubcategory;
        });
    }
  }

  deleteSubcategory(subcategory: ISubcategory) {
    this.subcategoryService
      .deleteSubcategory(subcategory._id)
      .subscribe((res) => {
        this.getSubcategories();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `'${subcategory.name}' removed Successfully`,
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
