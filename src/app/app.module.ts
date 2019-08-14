import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatCardModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
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
import { RevisoesAssinanteComponent } from './components/revisoes/assinante/revisoes-assinante.component';
import { UploadRevisaoComponent } from './components/revisoes/upload-revisao/upload-revisao.component';
import { RevisoesNovasComponent } from './components/revisoes/revisor/novas/revisoes-novas.component';
import { RevisoesPendentesComponent } from './components/revisoes/revisor/pendentes/revisoes-pendentes.component';
import { DialogConfirmComponent } from './components/dialog/confirmation-dialog.component';
import { PainelRevisorComponent } from './components/revisoes/revisor/painel-revisor/painel-revisor.component';
import { RedacoesComponent } from './components/redacoes/redacoes.component';
import { RevisoesFinalizadasComponent } from './components/revisoes/revisor/finalizadas/revisoes-finalizadas.component';
import { PostagensComponent } from './components/postagens/postagens.component';
import { EditarPostagemComponent } from './components/postagens/editar-postagem/editar-postagem.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';


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
  { path:'redacoes', component: PostagensComponent },
  { path:'postagem/editar/:id', component: EditarPostagemComponent, canActivate: [AdminAuthGuardService] },  
  { path:'revisoes-assinante', component: RevisoesAssinanteComponent, canActivate: [AuthGuardService] },
  { path:'upload-revisao', component: UploadRevisaoComponent, canActivate: [AuthGuardService] },  
  { path:'upload-correcao/:revisaoId', component: UploadRevisaoComponent, canActivate: [AdminAuthGuardService] },  
  { path:'revisoes-novas', component: RevisoesNovasComponent, canActivate: [AdminAuthGuardService] },
  { path:'revisoes-pendentes', component: RevisoesPendentesComponent, canActivate: [AdminAuthGuardService] },
  { path:'revisoes-finalizadas', component: RevisoesFinalizadasComponent, canActivate: [AdminAuthGuardService] },
  { path:'painel-revisor', component: PainelRevisorComponent, canActivate: [AdminAuthGuardService] },
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
    RevisoesAssinanteComponent,
    QuizComponent,
    EmailEnviadoComponent,
    ConfirmaEmailComponent,
    RedefinirSenhaComponent,
    EmailRedefinirSenhaComponent,
    UploadRevisaoComponent,
    RevisoesNovasComponent,
    DialogConfirmComponent,
    RevisoesPendentesComponent,
    PainelRevisorComponent,
    RedacoesComponent,
    RevisoesFinalizadasComponent,
    PostagensComponent,
    EditarPostagemComponent
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
    MatDialogModule,    
    RouterModule.forRoot(appRouter, { useHash: true })
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
