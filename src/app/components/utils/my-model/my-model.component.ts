import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';

@Component({
  selector: 'app-my-model',
  templateUrl: './my-model.component.html',
  styleUrls: ['./my-model.component.css'],
})
export class MyModelComponent {
  @Input() showModal: boolean = false;
  @Input() product: IProduct = {} as IProduct;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  closeModal() {
    this.closeModalEvent.emit(false);
  }
}
