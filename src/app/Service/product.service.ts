import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Products } from '../Model/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Create the URL of the API
  private apiUrl = '';

  constructor() { }

  // Inject the Http 
  http = Inject(HttpClient);

  getAllProduct() {
    return this.http.get(this.apiUrl) as Observable<Products[]>;
  }

}
