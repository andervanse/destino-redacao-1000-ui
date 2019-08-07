import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButton } from '@angular/material';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Postagem } from 'src/app/models/postagem.model';
import { PostagemService } from 'src/app/services/postagem.service';

@Component({
  selector: 'app-editar-postagem',
  templateUrl: './editar-postagem.component.html',
  styleUrls: ['./editar-postagem.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditarPostagemComponent,
      multi: true
    }
  ]
})
export class EditarPostagemComponent implements OnInit {

  postagemForm: FormGroup;
  errorMessage: string;
  isProcessing: boolean;
  @ViewChild('btnSalvar') btnSalvar: MatButton;
  private imageFile: File | null = null;
 
  constructor(
    private router: Router,
    private postagemSrv: PostagemService) { }

    ngOnInit() {
      this.isProcessing = false;
      this.errorMessage = '';
  
      this.postagemForm = new FormGroup({
        id: new FormControl('', []),
        titulo: new FormControl('', [Validators.required]),
        texto: new FormControl('', [Validators.required]),
        imagem: new FormControl(null, [Validators.required])
      });
    }

    onNotificationClick() {
      this.errorMessage = '';
    }

    onFileChange(event) {

      console.log(event);
      let reader = new FileReader();
  
      if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        
        if (file.size > 0 && (file.size/1024 > 1500)) {
          this.errorMessage = 'Tamanho do arquivo excede o limite de 1.5Mb';
          return;
        }

        reader.readAsDataURL(file);

        reader.onload = () => {
          this.postagemForm.patchValue({
            imagem: file.name
          });
          this.imageFile = file;
        };
      }
    }

    onSubmit() {
      this.errorMessage = '';
      this.btnSalvar._elementRef.nativeElement.innerText = 'Aguarde';
  
      if (this.postagemForm.valid) {
        this.isProcessing = true;

        if (isNullOrUndefined(this.postagemForm.value.titulo) || isNullOrUndefined(this.postagemForm.value.texto)) {
          this.isProcessing = false;
          this.errorMessage = 'Postagem inválida';
          this.btnSalvar._elementRef.nativeElement.innerText = 'Salvar';
          return;
        }

        const formData = new FormData();
        formData.append('id', this.postagemForm.value.id);  
        formData.append('titulo', this.postagemForm.value.titulo);  
        formData.append('texto', this.postagemForm.value.texto);
        formData.append('arquivo', this.imageFile);
  
        this.postagemSrv.salvarPostagem(formData).subscribe(
          (resp) => {
            this.isProcessing = false;
            this.btnSalvar._elementRef.nativeElement.innerText = 'Salvar';
          }, (errorResponse) => {
            this.isProcessing = false;
            this.btnSalvar._elementRef.nativeElement.innerText = 'Salvar';
    
            if (errorResponse.status == 0) {
              this.errorMessage = 'Serviço indisponível';
            } else {
              this.errorMessage = 'Falha ao salvar informações.';
            }
        });
      }
    }     
}

