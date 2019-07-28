import { Component, OnInit } from '@angular/core';
import { AssinanteService } from 'src/app/services/assinante.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-email-enviado',
  templateUrl: './email-enviado.component.html',
  styleUrls: ['./email-enviado.component.css']
})
export class EmailEnviadoComponent implements OnInit {

  assinanteCadastrado :Usuario;
  
  constructor(
    private assinanteSrv :AssinanteService
  ) { }

  ngOnInit() {
    this.assinanteCadastrado = this.assinanteSrv.getAssinanteCadastrado();
  }

}
