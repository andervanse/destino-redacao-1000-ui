import { Component, OnInit } from '@angular/core';
import { Revisao } from 'src/app/models/revisao.model';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../../dialog/confirmation-dialog.component';

@Component({
  selector: 'app-revisoes-finalizadas',
  templateUrl: './revisoes-finalizadas.component.html',
  styleUrls: ['./revisoes-finalizadas.component.css']
})
export class RevisoesFinalizadasComponent implements OnInit {

  revisoes :Revisao[];
  isProcessing :boolean = false;
  errorMessage: string = null;

  constructor (
    public dialog: MatDialog,
    private router: Router,
    private revisaoSvc: RevisaoAssinanteService
  ) { }

  ngOnInit() {
    this.isProcessing = true;

    this.revisaoSvc.obterRevisoesFinalizadas().subscribe(
      (resp) => {
         this.isProcessing = false;
         this.errorMessage = null;
         this.revisoes = resp;
      }, (errorResponse) => {
         this.isProcessing = false;
         this.errorMessage = 'Falha ao consultar revisões.';
         console.error(errorResponse.error);
    });

  }

  uploadArquivoCorrecao(revisaoRef :Revisao) {
    this.revisaoSvc.atualizarRevisaoUploadCorrecao(revisaoRef);
    this.router.navigate(['../revisoes/upload-correcao/', revisaoRef.id]);
  }

  onConfirmarExclusao(revisao :Revisao) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '70%',
      data: { title :'Atenção', content :'Deseja excluir esta Correção?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('result', result);
        this.revisaoSvc.excluirRevisao(revisao)
        .subscribe(
           (resp) => {
              this.isProcessing = false;
              this.errorMessage = null;
              revisao.arquivo = null;
          }, (errorResponse) => {
              this.isProcessing = false;
              this.errorMessage = 'Falha ao deletar revisão.';
              console.error(errorResponse.error);
        });
      }
    });
  }

}
