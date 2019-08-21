import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PostagensComponent } from "./postagens.component";
import { EditarPostagemComponent } from "./editar-postagem/editar-postagem.component";
import { AdminAuthGuardService } from "src/app/services/admin-auth-guard.service";

const appRoutes = [
    { path:':categoria', component: PostagensComponent },
    { path:'editar/:id', component: EditarPostagemComponent, canActivate: [AdminAuthGuardService] }
  ];

  @NgModule({
    imports: [
        RouterModule.forChild(appRoutes)],
    exports: [ RouterModule ]
})
export class PostagensRoutingModule {}
