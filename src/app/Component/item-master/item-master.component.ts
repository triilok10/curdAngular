import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Products } from '../../Model/products';
import { ProductService } from '../../Service/product.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit, OnDestroy {
  @ViewChild('myModal') modal: ElementRef | undefined;

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
  

  openModel(): void {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block'; 
    }
  }

  
  closeModel(): void {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'none';  
    }
  }

  setFormState(): void {
    this.productForm = this.fb.group({
      ProductItemID: [0],
      ProductName: ['', [Validators.required]],
      Price: [0, [Validators.required]],
      Rating: [0, [Validators.required]],
      Description: ['', [Validators.required]],
      Status: [false]
    });
  }

  onSubmit(): void {
    const productData: Products = this.productForm.value;

    console.log('Form Data:', productData);
    this.prodServe.postProduct(productData).subscribe(
      (response) => {
        console.log('Product added successfully', response);
        this.closeModel();
        this.getAllProductList();
      },
      (error) => {
        console.error('Error while adding product', error);
      }
    );
  }


  getAllProductList(): void {
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
