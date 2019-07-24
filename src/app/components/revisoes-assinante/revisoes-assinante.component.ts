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
  
  constructor (
    private revisaoSvc: RevisaoAssinanteService
  ) { }

  ngOnInit() {

    this.revisaoSvc.obterRevisoes().subscribe((resp) => {
      console.log(resp);
      this.revisoes = resp;
    }, (errorResponse) => {
      console.error(errorResponse);
    });

  }

}
