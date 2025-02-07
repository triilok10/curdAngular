import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Products } from '../../Model/products';
import { ProductService } from '../../Service/product.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-item-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  productForm: FormGroup = new FormGroup({});
  productList: Products[] = [];
  private productSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private prodServe: ProductService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setFormState();
    this.getAllProductList();
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  openModel() {
    this.showModal = true;
  }

  closeModel() {
    this.showModal = false;
  }

  setFormState() {
    this.productForm = this.fb.group({
      ProductItemID: [0],
      ProductName: ['', [Validators.required]],
      Price: [0, [Validators.required]],
      Rating: [0, [Validators.required]],
      Description: ['', [Validators.required]],
      Status: [false]
    });
  }

  onSubmit() {
    console.log(this.productForm.value);
    this.closeModel();
  }

  getAllProductList() {
    this.productSubscription = this.prodServe.getAllProduct().subscribe(
      (res: Products[]) => {
        console.log("API Response (Product List):", res);
        if (res && res.length > 0) {
          this.productList = res;
          console.log("Product List Assigned:", this.productList);
          this.cdRef.detectChanges(); 
        } else {
          console.error('Error: No products found or empty list');
        }
      },
      (error) => {
        console.error('Error fetching product list:', error);
      }
    );
  }
}
