import { Component, OnInit } from '@angular/core';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';
import { Revisao } from 'src/app/models/revisao.model';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../revisor/confirmation-dialog.component';


@Component({
  selector: 'app-revisoes-assinante',
  templateUrl: './revisoes-assinante.component.html',
  styleUrls: ['./revisoes-assinante.component.css']
})
export class RevisoesAssinanteComponent implements OnInit {

  revisoes :Revisao[];
  isProcessing :boolean = false;
  errorMessage: string = null;

  constructor (
    private dialog: MatDialog,
    private revisaoSvc: RevisaoAssinanteService
  ) { }

  ngOnInit() {
    this.isProcessing = true;

    this.revisaoSvc.obterRevisoes().subscribe(
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

  private deletarRevisao(revisao :Revisao) {
    
    if (revisao.arquivo) {  
      this.revisaoSvc.deletarRevisao(revisao).subscribe(
      (resp) => {
        this.isProcessing = false;
        this.errorMessage = null;
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
      data: { title :'Atenção', content :'Deseja excluir esta Revisão?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletarRevisao(revisao);
      }
    });
  }

}