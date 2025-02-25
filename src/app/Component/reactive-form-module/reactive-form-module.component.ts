import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-module',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form-module.component.html',
  styleUrl: './reactive-form-module.component.css'
})
export class ReactiveFormModuleComponent {

StudentForm : FormGroup = new FormGroup({
  firstName : new FormControl("",[Validators.required]),
  lastName : new FormControl(),
  phone: new FormControl("",[Validators.required]),
  email: new FormControl("", [Validators.required, Validators.email]),
  address : new FormControl()
});


formvalue: any;
onSave(){
this.formvalue = this.StudentForm.value;
console.log(this.formvalue);
}

}
