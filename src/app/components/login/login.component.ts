import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginCredentials } from 'src/app/models/login-credentials.model';
import { MatButton } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm :FormGroup;
  loginFailed :boolean = false;
  errorMessage :string;
  isProcessing :boolean = false;
  @ViewChild('btnLogin') btnLogin : MatButton;
  
  constructor(
    private router: Router, 
    private authService: AuthService) { }

  ngOnInit() {
      this.errorMessage = '';

      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
        senha: new FormControl('', [Validators.required, Validators.minLength(5)])
      });      
  }

  onSubmit(form) {
    this.errorMessage = '';
    this.isProcessing = true;
    this.btnLogin._elementRef.nativeElement.innerText = 'Aguarde';

    if (form.valid) {
      var credentials = new LoginCredentials();
      credentials.login = form.value.email;
      credentials.senha = form.value.senha;
      
      this.authService.autenticar(credentials).subscribe((resp) => {
        this.loginFailed = false;
        this.isProcessing = false;
        this.btnLogin._elementRef.nativeElement.innerText = 'Entrar';
        this.router.navigate(['home']);           
      },
      (errorResponse) => {
        this.loginFailed = true;
        this.isProcessing = false;
        this.btnLogin._elementRef.nativeElement.innerText = 'Entrar';

        if (errorResponse.status == 500) {
          this.errorMessage = 'Falha ao cadastrar Usuário';
        } else if (errorResponse.status == 400) {
          this.errorMessage = 'Usuário ou Senha inválidos';
        } else if (errorResponse.status == 0) {
            this.errorMessage = 'Serviço indisponível'
        } else {
            this.errorMessage = errorResponse.statusText;
        }
      });
    }
  }

  onNotificationClick() {    
    this.loginFailed = false;
  }

}
