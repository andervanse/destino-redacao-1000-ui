import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ContatoComponent } from './components/contato/contato.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { FooterComponent } from './components/footer/footer.component';
import { RedacoesAssinanteComponent } from './components/redacoes-assinante/redacoes-assinante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './components/quiz/quiz.component';
import { AuthService } from './services/auth.service';
import { JwtInterceptor } from './services/interceptors/jwt-interceptor.service';
import { ErrorInterceptor } from './services/interceptors/error-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfirmaEmailComponent } from './components/cadastro/confirma-email/confirma-email.component';
import { RedefinirSenhaComponent } from './components/senha/redefinir-senha/redefinir-senha.component';
import { EmailEnviadoComponent } from './components/cadastro/email-enviado/email-enviado.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EmailRedefinirSenhaComponent } from './components/senha/email-redefinir-senha/email-redefinir-senha.component';


const appRouter = [
  { path:'', redirectTo: '/home', pathMatch: 'full' },
  { path:'home', component: HomeComponent },
  { path:'cadastro', component: CadastroComponent },
  { path:'email-enviado', component: EmailEnviadoComponent },  
  { path:'email-redefinir-senha', component: EmailRedefinirSenhaComponent },
  { path:'confirmar-email/:email/:codigo', component: ConfirmaEmailComponent },
  { path:'reset-password/:email/:codigo', component: RedefinirSenhaComponent },  
  { path:'entrar', component: LoginComponent },
  { path:'quiz', component: QuizComponent },  
  { path:'redacoes-assinante', component: RedacoesAssinanteComponent, canActivate: [AuthGuardService] },
  { path:'contato', component: ContatoComponent },
  { path:'sobre', component: SobreComponent }
];

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
    RedacoesAssinanteComponent,
    QuizComponent,
    EmailEnviadoComponent,
    ConfirmaEmailComponent,
    RedefinirSenhaComponent,
    EmailRedefinirSenhaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    RouterModule.forRoot(appRouter, { useHash: true })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuardService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
