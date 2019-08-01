import { Component, OnInit } from '@angular/core';
import { Revisao } from 'src/app/models/revisao.model';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';

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

}
