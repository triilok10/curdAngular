import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './item-master.component.html',
  styleUrl: './item-master.component.css'
})
export class ItemMasterComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef | undefined;

  productForm: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.setFormState();

  }

  openModel() {
    const productModel = document.getElementById('myModal');

    if (productModel != null) {
      productModel.style.display = 'block';
    }
  }


  closeModel() {
    if (this.modal != null) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  // Submit the Form

  setFormState() {
    this.productForm = this.fb.group({
      ProductItemID: [0],
      ProductName: ['', [Validators.required]],
      Price: [0, [Validators.required]],
      Rating: [0, [Validators.required]],
      Description: ['', [Validators.required]],
      Status: [false, [Validators.required]]
    })
  }

  onSubmit() {
    console.log(this.productForm.value);
  }
}
