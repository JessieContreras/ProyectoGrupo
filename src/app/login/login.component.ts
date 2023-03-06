import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title='tesst';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _route: Router,
    public authService: AuthService
    , private toastr: ToastrService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      userCtrl: new FormControl('', [Validators.required]),
      passCtrl: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    })
  }

  get userField() {
    return this.form.get('userCtrl');
  }
  get passField() {
    return this.form.get('passCtrl');
  }
  login() {
    return new Promise((resolve, reject) => {
      this.authService.SignIn(this.form.controls['userCtrl'].value, this.form.controls['passCtrl'].value).then(res=>{
        resolve(res);
        this.toastr.success('Inicio de sesión correctamente', '¡Proceso exitoso!');
      })
    });


  }
}
