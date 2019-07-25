import { Component, OnInit } from '@angular/core';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';
import { Revisao } from 'src/app/models/revisao.model';


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
    private revisaoSvc: RevisaoAssinanteService
  ) { }

  ngOnInit() {
    this.isProcessing = true;

    this.revisaoSvc.obterRevisoes().subscribe((resp) => {
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
