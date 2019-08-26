import { Component, OnInit } from '@angular/core';
import { Postagem } from 'src/app/models/postagem.model';
import { PostagemService } from 'src/app/services/postagem.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../dialog/confirmation-dialog.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private authSvc: AuthService,
    private postagemSvc: PostagemService
  ) { }

  ngOnInit() {
    this.isProcessing = true;
    
    this.route.params.subscribe((params) => {
      let categoria = params['categoria'];
      this.postagemSvc.obterPostagens(categoria)
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
    })   
  }

  isAdmin():boolean {
    return this.authSvc.isAdmin();
  }

  sanitizeHTML(content :string):SafeHtml {
     return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  onNovaPostagem() {
    this.router.navigate(['postagens/editar', 0]);
  }

  onEditarPostagem(postagem :Postagem) {
    this.router.navigate(['postagens/editar', postagem.id]);
  }

  onConfirmarExclusaoPostagem(postagem :Postagem) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '70%',
      data: { title :'Atenção', content :'Deseja excluir esta Postagem?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirPostagem(postagem);
      }
    });
  }

  private excluirPostagem(postagem :Postagem) {
    this.postagemSvc.excluirPostagem(postagem).subscribe(
      (resp) => {
        let idx = this.postagens.findIndex(p => p.id == postagem.id);
        this.postagens
              .splice(idx, 1);  
      }
      ,(errorResponse) => {
        console.error(errorResponse);
      });     
  }

  onCloseErrorMessage() {
    this.errorMessage = null;
  }

}
