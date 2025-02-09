import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../Model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7063/api/ProductAPI';

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.apiUrl}/GetList`);
  }

  getProductById(productItemID: number): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/GetRecord?ProductItemID=${productItemID}`);
  }

  postProduct(product: Products): Observable<Products> {
    return this.http.post<Products>(`${this.apiUrl}/InsertRecord`, product);
  }

  updateProduct(productItemID: number, product: Products): Observable<Products> {
    return this.http.put<Products>(`${this.apiUrl}/UpdateRecord/${productItemID}`, product);
  }

  deleteProduct(productItemID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteRecord/${productItemID}`);
  }
}
