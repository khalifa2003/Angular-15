import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ICategory } from 'src/app/Models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css'],
})
export class CategoryManagementComponent {
  categoryDialog: boolean = false;
  categories: ICategory[] = [];
  category: ICategory = {} as ICategory;
  categoryForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {
    this.getCategories();

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image: ['', Validators.required],
    });
  }

  openNew() {
    this.category = {} as ICategory;
    this.categoryForm.reset();
    this.categoryDialog = true;
  }

  openEdit(category: ICategory) {
    this.category = category;
    this.categoryForm = this.fb.group({
      name: [category.name, Validators.required],
      description: [category.description],
      image: [category.image, Validators.required],
    });

    this.categoryDialog = true;
  }

  get f() {
    return this.categoryForm.controls;
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  submitAddCategory() {
    if (this.categoryForm.valid) {
      this.categoryService
        .createCategory(this.categoryForm.value)
        .subscribe((res) => {
          this.getCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.categoryForm.value.name} added Successfully`,
          });
          this.categoryDialog = false;
          this.categoryForm.reset();
        });
    }
  }

  submitEditCategory() {
    if (this.categoryForm.valid) {
      this.categoryService
        .editCategory(this.category._id, this.categoryForm.value)
        .subscribe((res) => {
          this.getCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `'${this.categoryForm.value.name}' edited Successfully`,
          });
          this.categoryDialog = false;
          this.categoryForm.reset();
          this.category = {} as ICategory;
        });
    }
  }

  deleteCategory(category: ICategory) {
    this.categoryService.deleteCategory(category._id).subscribe((res) => {
      this.getCategories();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `'${this.categoryForm.value.name}' removed Successfully`,
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
