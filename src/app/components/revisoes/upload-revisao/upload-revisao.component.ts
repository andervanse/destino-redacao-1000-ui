import { Component, OnInit, ViewChild } from '@angular/core';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButton } from '@angular/material';
import { Router } from '@angular/router';
import { Revisao } from 'src/app/models/revisao.model';

@Component({
  selector: 'app-upload-revisao',
  templateUrl: './upload-revisao.component.html',
  styleUrls: ['./upload-revisao.component.css']
})
export class UploadRevisaoComponent implements OnInit {

  revisaoForm: FormGroup;
  uploadedFile: File;
  revisoes: Revisao[];
  errorMessage: string = null;
  isProcessing: boolean = false;
  @ViewChild('btnSalvar') btnLogin : MatButton;

  constructor(
    private router: Router,
    private revisaoSvc: RevisaoAssinanteService
  ) { }

  ngOnInit() {
    this.revisaoForm = new FormGroup ({
      arquivo: new FormControl(),
      comentario: new FormControl('', [])
    });

    this.revisaoSvc.obterRevisoes().subscribe((resp) => {
      this.isProcessing = false;
      this.revisoes = resp;
    }, (errorResponse) => {
      this.isProcessing = false;
      this.errorMessage = 'Falha ao carregar revisões.';
      console.error(errorResponse);
    });    
  }

  onSubmit() {
    
    if (this.revisaoForm.valid) {
      this.isProcessing = true;
      this.btnLogin._elementRef.nativeElement.innerText = 'Aguarde';
      const formData = new FormData();
      var revisaoId = this.revisoes.find(r => r.arquivo.nome == this.revisaoForm.get('arquivo').value).id;
      formData.append('revisaoId', (revisaoId ? revisaoId.toString() : ''));
      formData.append('arquivo', this.uploadedFile);
      formData.append('comentario', this.revisaoForm.get('comentario').value);
  
      this.revisaoSvc.uploadArquivoRevisao(formData)
          .subscribe((resp) => {
            this.errorMessage = null;
             console.log(resp);
             this.isProcessing = false;
             this.btnLogin._elementRef.nativeElement.innerText = 'Salvar';
             this.router.navigate(['./revisoes-assinante']);
          }, (errorResponse) => {
              this.errorMessage = 'Erro ao processar arquivo';
              console.error(errorResponse);
              this.isProcessing = false;
              this.btnLogin._elementRef.nativeElement.innerText = 'Salvar';
          });
    }

  }

  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.revisaoForm.patchValue({
          arquivo: file.name
        });
        this.uploadedFile = file;
        console.log('file uploaded',  file.name);
      };
      
    }
  }

}
