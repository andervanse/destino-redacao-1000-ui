import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButton } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { Usuario } from 'src/app/models/usuario.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssinanteService } from 'src/app/services/assinante.service';

@Component({
  selector: 'app-resetar-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent implements OnInit {

  resetSenhaForm :FormGroup;
  errorMessage :string;
  isProcessing :boolean;
  email :string;
  codigo :string;

  @ViewChild('btnSalvarCadastro') btnSalvar: MatButton;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: AssinanteService) { }

  ngOnInit() {

    this.route.params.subscribe((params:Params) => {
      this.email = params['email'];
      this.codigo = params['codigo'];
    });

    this.isProcessing = false;
    this.errorMessage = '';

    this.resetSenhaForm = new FormGroup({
      senha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      confirmaSenha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)])
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.btnSalvar._elementRef.nativeElement.innerText = 'Aguarde';
  
    if (this.resetSenhaForm.valid) {
      this.isProcessing = true;

      if ((!isNullOrUndefined(this.resetSenhaForm.value.senha) && !isNullOrUndefined(this.resetSenhaForm.value.confirmaSenha))
        && (this.resetSenhaForm.value.senha !== this.resetSenhaForm.value.confirmaSenha)) {
        this.isProcessing = false;
        this.errorMessage = 'Senha e confirmação de senha diferentes!';
        this.btnSalvar._elementRef.nativeElement.innerText = 'Salvar';
        return;
      }
      
      let usrSenha = new Usuario();
      usrSenha.id = null;
      usrSenha.login = this.email;
      usrSenha.email = this.email;
      usrSenha.senha = this.resetSenhaForm.value.senha;
      usrSenha.confirmaSenha = this.resetSenhaForm.value.confirmaSenha;
      usrSenha.codigoResetSenha = this.codigo;

      this.usuarioService.definirNovaSenha(usrSenha).subscribe((resp) => {        
        this.isProcessing = false;
        this.btnSalvar._elementRef.nativeElement.innerText = 'Salvar';
        this.router.navigate(['entrar']);        
      }, (errorResponse) => {
        this.isProcessing = false;
        this.btnSalvar._elementRef.nativeElement.innerText = 'Salvar';

        for (var prop in errorResponse.error) {
          this.errorMessage += '\n' + errorResponse.error[prop][0];
        }
      });
    }
  } 
}
