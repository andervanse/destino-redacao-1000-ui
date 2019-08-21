import { Component, OnInit } from '@angular/core';
import { Revisao } from 'src/app/models/revisao.model';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';
import { MatDialog } from '@angular/material/dialog';
import { AtualizaRevisao } from 'src/app/models/atualiza-revisao.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogConfirmComponent } from '../../../dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revisoes-novas',
  templateUrl: './revisoes-novas.component.html',
  styleUrls: ['./revisoes-novas.component.css']
})
export class RevisoesNovasComponent implements OnInit {
  
  revisoes :Revisao[];
  isProcessing :boolean = false;
  errorMessage: string = null;

  constructor (
    private router: Router,
    private dialog: MatDialog,
    private authSvc: AuthService,
    private revisaoSvc: RevisaoAssinanteService
  ) { }

  ngOnInit() {
    this.isProcessing = true;

    this.revisaoSvc.obterRevisoesNovas().subscribe((resp) => {
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
      data: { title :'Atenção', content :'Deseja colocar este item na sua lista de correções?' }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        let revisor = this.authSvc.obterUsuario();
        let atualizaRevisao = new AtualizaRevisao();
        atualizaRevisao.revisaoId   = revisao.id;
        atualizaRevisao.assinanteId = revisao.assinanteId;
        atualizaRevisao.revisorId   = revisor.id;
        
        this.revisaoSvc.atualizarRevisor(atualizaRevisao).subscribe(
          (resp) => {
            this.router.navigate(['../revisoes/painel-revisor']);
          },
          (errorResponse) => { console.error(errorResponse.error); }
        );
      }
    });
  }

}



