import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}
  
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['entrar']);
      return false;
    }
    return true;
  }
}