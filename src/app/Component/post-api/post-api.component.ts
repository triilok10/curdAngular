import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-api',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './post-api.component.html',
  styleUrl: './post-api.component.css'
})
export class PostAPIComponent {


  studentForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", Validators.required),
    mobileNumber: new FormControl(0, Validators.required),
    address: new FormControl("", Validators.required),
    gender: new FormControl("")
  });


  formValue: any;

  constructor(private http: HttpClient) {

  }

  
  onSave() {
    this.http.post("https://localhost:7063/api/ProductAPI/PostAPI", this.studentForm.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe((res: any) => {
      if (res.status) {
        alert(res.message);
      } else {
        alert('Error in the API Hitting');
      }
    });
  }
  



}
