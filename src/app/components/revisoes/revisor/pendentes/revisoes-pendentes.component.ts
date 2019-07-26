import { Component, OnInit } from '@angular/core';
import { Revisao } from 'src/app/models/revisao.model';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';
import { DialogConfirmComponent } from '../confirmation-dialog.component';
import { AtualizaRevisao } from 'src/app/models/atualiza-revisao.model';

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
    private authSvc: AuthService,
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

  confirmaCheckOut(revisao :Revisao) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '70%',
      data: { title :'Atenção', content :'Deseja fazer o check-in desta Redação?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(revisao);

      if (result) {
        let revisor = this.authSvc.obterUsuario();
        let atualizaRevisao = new AtualizaRevisao();
        atualizaRevisao.revisaoId   = revisao.id;
        atualizaRevisao.assinanteId = revisao.assinanteId;
        atualizaRevisao.revisorId   = revisor.id;
        
        this.revisaoSvc.atualizarRevisor(atualizaRevisao).subscribe(
          (resp) => { console.log(resp); },
          (errorResponse) => { console.error(errorResponse.error); }
        );
      }
    });
  }
}
