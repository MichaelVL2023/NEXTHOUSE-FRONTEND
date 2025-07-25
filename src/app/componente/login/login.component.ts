// src/app/login/login.component.ts
import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {LoginService} from "../../services/login.service";
import {RequestDto} from "../../model/request-dto";
import {MatCheckbox} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, MatButton, MatCard, MatCardContent, MatCardTitle, MatFormField, MatInput, MatLabel, MatOption, MatSelect, ReactiveFormsModule, MatCheckbox, MatIcon]
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';
  rememberMe: boolean = false;
  router: Router = inject(Router);
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);


  constructor() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      contrasena: ['', Validators.required],
      rememberMe: [false]

    })
  }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      localStorage.removeItem('token');
      console.log("Token eliminado");
    }
    this.loadForm()
  }

  loadForm(): void {
     console.log("Form");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const requestDto: RequestDto = new RequestDto()
      requestDto.email = this.loginForm.value.email;
      requestDto.contrasena = this.loginForm.value.contrasena;
      this.loginService.login(requestDto).subscribe({
        next: (data: Object): void => {
          console.log("Login response:", data);
        }
      })

      this.router.navigate(['/home'])
      alert("Login ok!")

    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }
  }
}
