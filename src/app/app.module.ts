import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSelectModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatCardModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './components/home/home.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ContatoComponent } from './components/contato/contato.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './components/quiz/quiz.component';
import { AuthService } from './services/auth.service';
import { JwtInterceptor } from './services/interceptors/jwt-interceptor.service';
import { ErrorInterceptor } from './services/interceptors/error-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';

import { ConfirmaEmailComponent } from './components/cadastro/confirma-email/confirma-email.component';
import { RedefinirSenhaComponent } from './components/senha/redefinir-senha/redefinir-senha.component';
import { EmailEnviadoComponent } from './components/cadastro/email-enviado/email-enviado.component';
import { EmailRedefinirSenhaComponent } from './components/senha/email-redefinir-senha/email-redefinir-senha.component';
import { RevisaoAssinanteService } from './services/revisao-assinante.service';
import { DialogConfirmComponent } from './components/dialog/confirmation-dialog.component';
import { RedacoesComponent } from './components/redacoes/redacoes.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    SobreComponent,
    ContatoComponent,
    LoginComponent,
    CadastroComponent,
    FooterComponent,
    QuizComponent,
    EmailEnviadoComponent,
    ConfirmaEmailComponent,
    RedefinirSenhaComponent,
    EmailRedefinirSenhaComponent,
    DialogConfirmComponent,
    RedacoesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,  
    AppRoutingModule    
  ],
  entryComponents: [
    DialogConfirmComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false} },
    AuthGuardService,
    AdminAuthGuardService,
    AuthService,
    RevisaoAssinanteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
