import { Component, OnInit } from '@angular/core';
import { AssinanteService } from 'src/app/services/assinante.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-confirma-email',
  templateUrl: './confirma-email.component.html',
  styleUrls: ['./confirma-email.component.css']
})
export class ConfirmaEmailComponent implements OnInit {
  email: string;
  codigo: string;
  isProcessing :boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: AssinanteService) { }

  ngOnInit() {
    this.isProcessing = false;
    this.route.params.subscribe((params: Params) => {
      this.email = params['email'];
      this.codigo = params['codigo'];
    });
  }

  onConfirmarEmail() {
    this.isProcessing = true;

    if (!isNullOrUndefined(this.email) && !isNullOrUndefined(this.codigo)) {
      this.usuarioService.confirmarEmail(this.email, this.codigo)
        .subscribe((resp) => {
          this.router.navigate(['entrar']);
        }, (error) => {
          this.isProcessing = false;
          console.error(error);
        });
    }
  }

}
