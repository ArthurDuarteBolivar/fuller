import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../pages/meus-numeros/meus-numeros.component';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent {

  estado: boolean = false;

  constructor(private _formBuilder: FormBuilder,){}

  loginForm = this._formBuilder.group({
    login: ['', Validators.required],
    senha: ['', Validators.required],
  });

  matcher = new MyErrorStateMatcher();

  conferir(){
    if(this.loginForm.value.login == "398567"){
      if(this.loginForm.value.senha == "65537"){
        this.estado = true;
        return;
      }
    }
  }
}
