import { Component, OnInit, ViewChild } from '@angular/core';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButton } from '@angular/material';

@Component({
  selector: 'app-upload-revisao',
  templateUrl: './upload-revisao.component.html',
  styleUrls: ['./upload-revisao.component.css']
})
export class UploadRevisaoComponent implements OnInit {

  revisaoForm: FormGroup;
  uploadedFile: File;
  isProcessing: boolean = false;
  @ViewChild('btnSalvar') btnLogin : MatButton;

  constructor(
    private revisaoSvc: RevisaoAssinanteService
  ) { }

  ngOnInit() {
    this.revisaoForm = new FormGroup ({
      arquivo: new FormControl(),
      comentario: new FormControl('', [])
    });
  }

  onSubmit() {
    
    if (this.revisaoForm.valid) {
      this.isProcessing = true;
      this.btnLogin._elementRef.nativeElement.innerText = 'Aguarde';
      const formData = new FormData();
      formData.append('arquivo', this.uploadedFile);
      formData.append('comentario', this.revisaoForm.get('comentario').value);
  
      this.revisaoSvc.uploadArquivoRevisao(formData)
          .subscribe((resp) => {
             console.log(resp);
             this.isProcessing = false;
             this.btnLogin._elementRef.nativeElement.innerText = 'Salvar';
          }, (errorResponse) => {
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
