import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatButton } from "@angular/material";
import { AssinanteService } from "src/app/services/assinante.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-email-redefinir-senha',
  templateUrl: './email-redefinir-senha.component.html',
  styleUrls: ['./email-redefinir-senha.component.css']
})
export class EmailRedefinirSenhaComponent implements OnInit {

  envioEmailForm :FormGroup;
  errorMessage :string;
  isProcessing :boolean;
  success :boolean;
  successMessage :string;
  @ViewChild('btnEnvioEmail') btnEnvioEmail :MatButton;

  constructor(
    private assinanteSrv :AssinanteService,
    private router :Router
  ) { }

  ngOnInit() {
    this.success = false;
    this.isProcessing = false;
    this.envioEmailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    this.isProcessing = true;
    this.errorMessage = '';
    this.btnEnvioEmail._elementRef.nativeElement.innerText = 'Aguarde';
  
    if (this.envioEmailForm.valid) {
     
      this.assinanteSrv.redefinirSenha(this.envioEmailForm.value.email).subscribe((resp) => {        
        this.isProcessing = false;
        this.btnEnvioEmail._elementRef.nativeElement.innerText = 'Salvar';
        this.success = true;
      }, (errorResponse) => {
        this.isProcessing = false;
        this.btnEnvioEmail._elementRef.nativeElement.innerText = 'Salvar';
        
        if (errorResponse.error.message)
          this.errorMessage = errorResponse.error.message;
      });
    }
  }   

}
