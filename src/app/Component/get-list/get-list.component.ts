import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './get-list.component.html',
  styleUrl: './get-list.component.css'
})
export class GetListComponent implements OnInit {

  userList: any[] = [];



  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getAllUser();
  }

  onRefresh(){
    this.getAllUser();
    alert("Refreshing")
  }

  getAllUser() {
    debugger;
    this.http.get("https://localhost:7063/api/ProductAPI/GetAPI").subscribe((res: any) => {
      debugger;
      if (res.status && res.totalRecord > 0) {
        this.userList = res.productItems;
      } else {
        alert("No record found");
      }
    })
  }
}
