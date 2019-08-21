import { NgModule } from "@angular/core";
import { RevisoesRoutingModule } from "./revisoes-routing.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { UploadRevisaoComponent } from "./upload-revisao/upload-revisao.component";
import { RevisoesAssinanteComponent } from "./assinante/revisoes-assinante.component";
import { RevisoesNovasComponent } from "./revisor/novas/revisoes-novas.component";
import { RevisoesPendentesComponent } from "./revisor/pendentes/revisoes-pendentes.component";
import { RevisoesFinalizadasComponent } from "./revisor/finalizadas/revisoes-finalizadas.component";
import { PainelRevisorComponent } from "./revisor/painel-revisor/painel-revisor.component";
import { MatSelectModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatInputModule, MatDialogModule } from "@angular/material";
import { RevisaoAssinanteService } from "src/app/services/revisao-assinante.service";

@NgModule({
    declarations: [
        UploadRevisaoComponent,
        UploadRevisaoComponent,
        RevisoesAssinanteComponent, 
        RevisoesNovasComponent, 
        RevisoesPendentesComponent, 
        RevisoesFinalizadasComponent, 
        PainelRevisorComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RevisoesRoutingModule,
        MatSelectModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule        
    ],
    providers: [
        RevisaoAssinanteService
    ]
})
export class RevisoesModule {}