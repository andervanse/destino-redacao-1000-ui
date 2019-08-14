import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'confirmation-dialog',
    templateUrl: 'confirmation-dialog.component.html',
  })
  export class DialogConfirmComponent {
  
    constructor(
      public dialogRef: MatDialogRef<DialogConfirmComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    onCancelarClick(): void {
      this.dialogRef.close();
    }
  
  }