import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor() { }

  @ViewChild('frmLogin') frmLogin : FormControl;

  ngOnInit() {
  }

  onSubmitForm() {
    console.log(this.frmLogin);
  }
}
