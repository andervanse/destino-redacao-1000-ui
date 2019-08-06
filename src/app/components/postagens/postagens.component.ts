import { Component, OnInit } from '@angular/core';
import { Postagem } from 'src/app/models/postagem.model';
import { PostagemService } from 'src/app/services/postagem.service';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.css']
})
export class PostagensComponent implements OnInit {

  postagens :Postagem[];
  isProcessing :boolean = false;
  errorMessage: string = null;

  constructor(
    private postagemSvc: PostagemService
  ) { }

  ngOnInit() {
    this.isProcessing = true;

    this.postagemSvc.obterPostagens()
        .subscribe(
          (resp) => {
            this.isProcessing = false;
            this.errorMessage = null;
            this.postagens = resp;
          }, (errorResponse) => {
            this.isProcessing = false;
            this.errorMessage = 'Falha ao consultar Posts.';
            console.error(errorResponse.error);
        });    
  }

  onCloseErrorMessage() {
    this.errorMessage = null;
  }

}
