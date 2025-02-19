import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-templateform',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './templateform.component.html',
  styleUrl: './templateform.component.css'
})
export class TemplateformComponent {



  objUser: any = {
    firstName:'' ,
    lastName: '',
    phone: '',
    email: '',
    address: ''
  }

  constructor() {

  }

  formValue: any;
  OnSubmit() {
    debugger;
    this.formValue = this.objUser;
    console.log(this.formValue);
  }
}
