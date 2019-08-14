import { Component, OnInit } from '@angular/core';
import { Revisao } from 'src/app/models/revisao.model';
import { MatDialog } from '@angular/material';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';
import { DialogConfirmComponent } from '../../../dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revisoes-pendentes',
  templateUrl: './revisoes-pendentes.component.html',
  styleUrls: ['./revisoes-pendentes.component.css']
})
export class RevisoesPendentesComponent implements OnInit {

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

    this.revisaoSvc.obterRevisoesPendentes().subscribe((resp) => {
      this.isProcessing = false;
      this.errorMessage = null;
      this.revisoes = resp;
    }, (errorResponse) => {
      this.isProcessing = false;
      this.errorMessage = 'Falha ao consultar revisões.';
      console.error(errorResponse.error);
    });

  }

  onCloseErrorMessage() {
    this.errorMessage = null;
  }

  uploadArquivoCorrecao(revisao :Revisao) {
    this.revisaoSvc.atualizarRevisaoUploadCorrecao(revisao);
    this.router.navigate(['../upload-correcao/', revisao.id]);
  }

  private deletarRevisao(revisao :Revisao) {
    
    if (revisao.arquivo) {  
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
  } 

  confirmarDelecaoRevisao(revisao :Revisao) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '70%',
      data: { title :'Atenção', content :'Deseja excluir esta Correção?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletarRevisao(revisao);
      }
    });
  }

}
