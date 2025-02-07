import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../Model/products';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7063/api/ProductAPI/GetList';

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Products[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        console.log('API Response:', response);  
        if (response && response.productItems) {
          return response.productItems;
        } else {
          console.error('Error: productItems not found in the response');
          throw new Error('productItems not found');
        }
      })
    );
  }
}
