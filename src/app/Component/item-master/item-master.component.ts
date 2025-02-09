import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../Service/product.service';
import { ProductResponse, Products } from '../../Model/products';
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
  ) { }

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
      productItemID: [0],
      productName: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      description: ['', Validators.required],
      status: [false]
    });
  }

  getAllProductList(): void {
    this.productSubscription = this.productService.getAllProduct().subscribe(
      (res: ProductResponse) => {
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

    if (productData.productItemID < 1) {
      // Add product
      this.productService.postProduct(productData).subscribe(
        (response) => {
          this.getAllProductList();
          this.closeModel();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      // Update product
      this.productService.updateProduct(productData.productItemID, productData).subscribe(
        (response) => {
          this.getAllProductList();
          this.closeModel();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  editItem(productItemID: number): void {
    this.productService.getProductById(productItemID).subscribe(
      (response) => {
        const product = response.productItems[0]; 
        this.productForm.patchValue(product);
        this.openModel();
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
      this.productForm.reset({
        ProductItemID: 0,
        ProductName: '',
        Price: 0,
        Rating: 0,
        Description: '',
        Status: false
      });
    }
  }
}

