import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UploadRevisaoComponent } from "./upload-revisao/upload-revisao.component";
import { AuthGuardService } from "src/app/services/auth-guard.service";
import { AdminAuthGuardService } from "src/app/services/admin-auth-guard.service";
import { RevisoesAssinanteComponent } from "./assinante/revisoes-assinante.component";
import { RevisoesNovasComponent } from "./revisor/novas/revisoes-novas.component";
import { RevisoesPendentesComponent } from "./revisor/pendentes/revisoes-pendentes.component";
import { RevisoesFinalizadasComponent } from "./revisor/finalizadas/revisoes-finalizadas.component";
import { PainelRevisorComponent } from "./revisor/painel-revisor/painel-revisor.component";

const appRoutes = [
    { path:'upload-revisao', component: UploadRevisaoComponent, canActivate: [AuthGuardService] },  
    { path:'upload-correcao/:revisaoId', component: UploadRevisaoComponent, canActivate: [AdminAuthGuardService] },  
    { path:'assinante', component: RevisoesAssinanteComponent, canActivate: [AuthGuardService] },
    { path:'novas', component: RevisoesNovasComponent, canActivate: [AdminAuthGuardService] },
    { path:'pendentes', component: RevisoesPendentesComponent, canActivate: [AdminAuthGuardService] },
    { path:'finalizadas', component: RevisoesFinalizadasComponent, canActivate: [AdminAuthGuardService] },
    { path:'painel-revisor', component: PainelRevisorComponent, canActivate: [AdminAuthGuardService] }
  ];

  @NgModule({
      imports: [
          RouterModule.forChild(appRoutes)
      ],
      exports: [ RouterModule ]
  })
  export class RevisoesRoutingModule {}