import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CadastroComponent } from "./components/cadastro/cadastro.component";
import { EmailEnviadoComponent } from "./components/cadastro/email-enviado/email-enviado.component";
import { EmailRedefinirSenhaComponent } from "./components/senha/email-redefinir-senha/email-redefinir-senha.component";
import { ConfirmaEmailComponent } from "./components/cadastro/confirma-email/confirma-email.component";
import { RedefinirSenhaComponent } from "./components/senha/redefinir-senha/redefinir-senha.component";
import { LoginComponent } from "./components/login/login.component";
import { QuizComponent } from "./components/quiz/quiz.component";
import { ContatoComponent } from "./components/contato/contato.component";
import { SobreComponent } from "./components/sobre/sobre.component";

const appRoutes = [
    { path:'', redirectTo: '/home', pathMatch: 'full' },
    { path:'home', component: HomeComponent },
    { path:'cadastro', component: CadastroComponent },
    { path:'email-enviado', component: EmailEnviadoComponent },  
    { path:'email-redefinir-senha', component: EmailRedefinirSenhaComponent },
    { path:'confirmar-email/:email/:codigo', component: ConfirmaEmailComponent },
    { path:'reset-password/:email/:codigo', component: RedefinirSenhaComponent },  
    { path:'entrar', component: LoginComponent },
    { path:'quiz', component: QuizComponent },
    { path:'postagens', loadChildren: './components/postagens/postagens.module#PostagensModule' },
    { path:'revisoes', loadChildren: './components/revisoes/revisoes.module#RevisoesModule' },  
    { path:'contato', component: ContatoComponent },
    { path:'sobre', component: SobreComponent },
    { path: '**', redirectTo: '' }
  ];


  @NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}