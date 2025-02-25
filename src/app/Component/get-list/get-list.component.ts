import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-get-list',
  imports: [],
  templateUrl: './get-list.component.html',
  styleUrl: './get-list.component.css'
})
export class GetListComponent {

  userList: any[] = [];
  constructor(private http: HttpClient) {

  }

  getAllUser() {
    debugger;
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res: any) => {
      this.userList = res;
      console.log(this.userList = res);
    })
  }
}
