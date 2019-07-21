import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('btnLogin') btnLogin : MatButton;
  
  constructor(
    private router: Router, 
    private authService: AuthService) { }

  ngOnInit() {
      this.errorMessage = '';

      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        senha: new FormControl('', [Validators.required])
      });      
  }

  onSubmit(form) {
    this.errorMessage = '';

    if (form.valid) {
      var credentials = new LoginCredentials();
      credentials.login = form.value.email;
      credentials.senha = form.value.senha;
      
      this.btnLogin._elementRef.nativeElement.classList.add('is-loading'); 

      this.authService.autenticar(credentials).subscribe((resp) => {
        this.loginFailed = false;
        this.btnLogin._elementRef.nativeElement.classList.remove('is-loading');
        this.router.navigate(['home']);        
      },
      (error) => {
        this.btnLogin._elementRef.nativeElement.classList.remove('is-loading');
        if (error.status == 400) {
          this.errorMessage = 'Usuário ou Senha inválidos';
        }else {
          if (error.status == 0) {
            this.errorMessage = 'Serviço indisponível'
          } else {
            this.errorMessage = error.statusText;
          }
        }
        this.loginFailed = true;
      });
    }
  }

  onNotificationClick(form) {    
    this.loginFailed = false;
  }

}
