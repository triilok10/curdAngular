import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../Service/product.service';
import { Products } from '../../Model/products';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-master',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit, OnDestroy {
  @ViewChild('myModal') modal: ElementRef | undefined;
  productForm: FormGroup = new FormGroup({}); 
  productList: Products[] = [];
  private productSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.setFormState();
    this.getAllProductList();
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  setFormState(): void {
    this.productForm = this.fb.group({
      ProductItemID: [0],
      ProductName: ['', Validators.required],
      Price: [0, Validators.required],
      Rating: [0, Validators.required],
      Description: ['', Validators.required],
      Status: [false]
    });
  }

  getAllProductList(): void {
    this.productSubscription = this.productService.getAllProduct().subscribe(
      (res: { apiStatus: number, message: string, productItems: Products[] }) => {
        this.productList = res.productItems;  
        console.log(this.productList); 
      },
      (error) => {
        console.error('Error fetching product list:', error);
      }
    );
  }
  
  
  

  onSubmit(): void {
    const productData: Products = this.productForm.value;

    if (productData.productItemID === 0) {
      this.productService.postProduct(productData).subscribe(
        (response) => {
          this.getAllProductList();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      this.productService.updateProduct(productData.productItemID, productData).subscribe(
        (response) => {
          this.getAllProductList();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  editItem(productItemID: number): void {
    this.productService.getProductById(productItemID).subscribe(
      (product) => {
        this.productForm.patchValue(product);
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  deleteItem(productItemID: number): void {
    this.productService.deleteProduct(productItemID).subscribe(
      () => {
        this.getAllProductList();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
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
  
}
