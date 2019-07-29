import { Component, OnInit } from '@angular/core';
import { Revisao } from 'src/app/models/revisao.model';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';
import { DialogConfirmComponent } from '../confirmation-dialog.component';
import { AtualizaRevisao } from 'src/app/models/atualiza-revisao.model';
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

  uploadArquivoCorrecao(revisao :Revisao) {
    this.revisaoSvc.atualizarRevisaoUploadCorrecao(revisao);
    this.router.navigate(['../upload-correcao/', revisao.id]);
  }

}
