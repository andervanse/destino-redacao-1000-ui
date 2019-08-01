import { Component, OnInit, ViewChild } from '@angular/core';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButton } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Revisao } from 'src/app/models/revisao.model';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-upload-revisao',
  templateUrl: './upload-revisao.component.html',
  styleUrls: ['./upload-revisao.component.css']
})
export class UploadRevisaoComponent implements OnInit {

  revisaoForm: FormGroup;
  uploadedFile: File;
  revisoes: Revisao[];
  revisaoIdRef: number;
  errorMessage: string = null;
  isProcessing: boolean = false;
  @ViewChild('btnSalvar') btnLogin: MatButton;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private authSvc: AuthService,
    private revisaoSvc: RevisaoAssinanteService
  ) { }

  ngOnInit() {
    this.revisaoForm = new FormGroup({
      arquivo: new FormControl(),
      comentario: new FormControl('', [])
    });

    this.route.params.subscribe((params) => {
      this.revisaoIdRef = +params['revisaoId'];
    });

    let usr = this.authSvc.obterUsuario();

    if (usr.tipoUsuario == 'Assinante') {
      this.revisaoSvc.obterRevisoes().subscribe((resp) => {
        this.isProcessing = false;
        this.revisoes = resp;
      }, (errorResponse) => {
        this.isProcessing = false;
        this.errorMessage = 'Falha ao carregar revisões.';
        console.error(errorResponse);
      });
    }
  }

  onSubmit() {

    if (this.revisaoForm.valid) {
      this.isProcessing = true;
      this.btnLogin._elementRef.nativeElement.innerText = 'Aguarde';
      const formData = new FormData();

      if (this.revisoes) {
        let revisao = this.revisoes.find(r => r.arquivo.nome == this.revisaoForm.get('arquivo').value);

        if (revisao) {
          formData.append('revisaoId', revisao.id.toString());
        }

      } else {
        formData.append('revisaoId', '0');
      }

      if (this.revisaoIdRef) {
        let revisao = this.revisaoSvc.obterRevisaoUploadCorrecao();
        formData.append('assinanteId', revisao.assinanteId.toString());  
        formData.append('revisaoIdRef', revisao.id.toString());
        formData.append('tipoArquivo', 'correcao');
      } else {
        formData.append('tipoArquivo', 'revisao');
      }

      formData.append('arquivo', this.uploadedFile);
      formData.append('comentario', this.revisaoForm.get('comentario').value);

      this.revisaoSvc.uploadArquivoRevisao(formData)
        .subscribe((resp) => {
          this.errorMessage = null;
          this.isProcessing = false;
          this.btnLogin._elementRef.nativeElement.innerText = 'Salvar';
          this.location.back();
        }, (errorResponse) => {
          this.errorMessage = 'Erro ao processar arquivo';
          console.error(errorResponse);
          this.isProcessing = false;
          this.btnLogin._elementRef.nativeElement.innerText = 'Salvar';
        });
    }

  }

  onCloseErrorMessage() {
    this.errorMessage = null;
  }

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      
      if (file.size > 0 && (file.size/1024 > 1500)) {
        this.errorMessage = 'Tamanho do arquivo excede o limite de 1.5Mb';
        return;
      }

      if (file.name == this.trataNomeArquivo(file.name)) {
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.revisaoForm.patchValue({
            arquivo: file.name
          });
          this.uploadedFile = file;
        };
      } else {
        this.errorMessage = 'Nome do arquivo não pode conter caracteres especiais.'
      }

    }
  }

  private trataNomeArquivo(nmArquivo :string) {
     return nmArquivo.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

}
