import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButton } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { Usuario } from 'src/app/models/usuario.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssinanteService } from 'src/app/services/assinante.service';

@Component({
  selector: 'app-resetar-senha',
  templateUrl: './resetar-senha.component.html',
  styleUrls: ['./resetar-senha.component.css']
})
export class ResetarSenhaComponent implements OnInit {

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
      senha: new FormControl('', [Validators.required]),
      confirmaSenha: new FormControl('', [Validators.required])
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
      
      let usrSenha: Usuario = {
        id: null,
        login: this.email,
        email: this.email,
        senha: this.resetSenhaForm.value.senha,
        confirmaSenha: this.resetSenhaForm.value.confirmaSenha,
        codigoResetSenha: this.codigo
      };

      this.usuarioService.definirNovaSenha(usrSenha).subscribe((resp) => {        
        this.isProcessing = false;
        this.btnSalvar._elementRef.nativeElement.innerText = 'Salvar';
        this.router.navigate(['entrar']);        
      }, (error) => {
        this.isProcessing = false;
        this.btnSalvar._elementRef.nativeElement.innerText = 'Salvar';

        for (var prop in error.error) {
          this.errorMessage += '\n' + error.error[prop][0];
        }
      });
    }
  }  

}
