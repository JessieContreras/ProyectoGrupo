import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      userCtrl: new FormControl('',[Validators.required]),
      passCtrl: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    })
  }

  get userField(){
    return this.form.get('userCtrl');
  }
  get passField(){
    return this.form.get('passCtrl');
  }

}
