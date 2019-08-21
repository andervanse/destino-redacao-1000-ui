import { NgModule } from "@angular/core";
import { PostagensComponent } from "./postagens.component";
import { EditarPostagemComponent } from "./editar-postagem/editar-postagem.component";
import { PostagensRoutingModule } from "./postagens-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PostagemService } from "src/app/services/postagem.service";
import { MatSelectModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatInputModule, MatDialogModule } from "@angular/material";

@NgModule({
    declarations: [
        PostagensComponent,
        EditarPostagemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        PostagensRoutingModule
    ],
    providers: [ PostagemService ]
})
export class PostagensModule {}