import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AssinanteService } from 'src/app/services/assinante.service';
import { isNullOrUndefined } from 'util';
import { Usuario } from 'src/app/models/usuario.model';
import { MatButton } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm :FormGroup;
  errorMessage :string;
  isProcessing :boolean;
  @ViewChild('btnSalvarCadastro') btnSalvar: MatButton;
  
  constructor(
    private router: Router,
    private usuarioService: AssinanteService) { }
      
  ngOnInit() {
    this.isProcessing = false;
    this.errorMessage = '';

    this.cadastroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      confirmaSenha: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.btnSalvar._elementRef.nativeElement.innerText = 'Aguarde';
  
    if (this.cadastroForm.valid) {
      this.isProcessing = true;

      if ((!isNullOrUndefined(this.cadastroForm.value.senha) && !isNullOrUndefined(this.cadastroForm.value.confirmaSenha))
        && (this.cadastroForm.value.senha !== this.cadastroForm.value.confirmaSenha)) {
        this.isProcessing = false;
        this.errorMessage = 'Senha e confirmação de senha diferentes!';
        this.btnSalvar._elementRef.nativeElement.innerText = 'Salvar';
        return;
      }
      
      let usrSenha = new Usuario();
      usrSenha.id = null;
      usrSenha.login = this.cadastroForm.value.email,
      usrSenha.nome = this.cadastroForm.value.nome,
      usrSenha.email = this.cadastroForm.value.email,
      usrSenha.senha = this.cadastroForm.value.senha,
      usrSenha.confirmaSenha = this.cadastroForm.value.confirmaSenha;

      this.usuarioService.salvar(usrSenha).subscribe((resp) => {        
        this.isProcessing = false;
        this.btnSalvar._elementRef.nativeElement.innerText = 'Salvar';
        this.router.navigate(['email-enviado']);        
      }, (error) => {
        this.isProcessing = false;
        this.btnSalvar._elementRef.nativeElement.innerText = 'Salvar';

        for (var prop in error.error) {
          this.errorMessage += '\n' + error.error[prop][0];
        }
      });
    }
  }

  onNotificationClick() {
    this.errorMessage = '';
  }

  getEmailErrorMessage() {
    return this.cadastroForm.controls['email'].hasError('required') ? 'Campo Obrigatório' :
        this.cadastroForm.controls['email'].hasError('email') ? 'E-Mail inválido' :
            '';
  }

  getNomeErrorMessage() {
    return this.cadastroForm.controls['nome'].hasError('required') ? 'Campo Obrigatório' : '';
  }

  getSenhaErrorMessage() {
    return this.cadastroForm.controls['senha'].hasError('required') ? 'Campo Obrigatório' : '';
  }

  getConfirmaSenhaErrorMessage() {
    return this.cadastroForm.controls['confirmaSenha'].hasError('required') ? 'Campo Obrigatório' : '';
  }
}
