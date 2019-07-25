import { Component, OnInit, Inject } from '@angular/core';
import { Revisao } from 'src/app/models/revisao.model';
import { RevisaoAssinanteService } from 'src/app/services/revisao-assinante.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-revisor',
  templateUrl: './revisoes-revisor.component.html',
  styleUrls: ['./revisoes-revisor.component.css']
})
export class RevisoesRevisorComponent implements OnInit {
  
  revisoes :Revisao[];
  isProcessing :boolean = false;
  errorMessage: string = null;

  constructor (
    public dialog: MatDialog,
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

  confirmaCheckOut(evt) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      height: '300px',
      width: '400px',
      data: {nome:'teste'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}


@Component({
  selector: 'dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
