import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  @ViewChild('frmLogin') frmLogin : FormControl;

  ngOnInit() {
  }

  onSubmitForm() {
    console.log(this.frmLogin);
  }
}
