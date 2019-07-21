import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  @ViewChild('btnSalvarCadastro') btnSalvar: MatButton;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: AssinanteService) { }
      
  ngOnInit() {
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
    console.log(this.cadastroForm);
  
    if (this.cadastroForm.valid) {
      this.btnSalvar._elementRef.nativeElement.classList.add('is-loading');

      if ((!isNullOrUndefined(this.cadastroForm.value.senha) && !isNullOrUndefined(this.cadastroForm.value.confirmaSenha))
        && (this.cadastroForm.value.senha !== this.cadastroForm.value.confirmaSenha)) {
        this.errorMessage = 'Senha e confirmação de senha diferentes!';
        this.btnSalvar._elementRef.nativeElement.classList.remove('is-loading');
      }
      
      let usrSenha: Usuario = {
        id: null,
        login: this.cadastroForm.value.email,
        nome: this.cadastroForm.value.nome,
        email: this.cadastroForm.value.email,
        senha: this.cadastroForm.value.senha,
        confirmaSenha: this.cadastroForm.value.confirmaSenha
      };

      console.log(usrSenha);
      this.usuarioService.salvar(usrSenha).subscribe((resp) => {
        this.btnSalvar._elementRef.nativeElement.classList.remove('is-loading');
        this.router.navigate(['home']);
      }, (error) => {
        this.errorMessage = error.message;

        for(var prop in error.error) {
          console.log(prop);
          this.errorMessage += '\n' + error.error[prop][0];
        }        

        this.cadastroForm.value.senha = '';
        this.cadastroForm.value.confirmaSenha = '';
        this.btnSalvar._elementRef.nativeElement.classList.remove('is-loading');
      });
    }
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
