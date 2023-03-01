import { AppModule } from './../../../app.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialExampleModule } from 'src/angular.material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompraSorteioComponent } from '../../compra-sorteio/compra-sorteio.component';
import { FinalizacaoCompraComponent } from '../../finalizacao-compra/finalizacao-compra.component';
import { SorteiosComponent } from '../../sorteios/sorteios.component';
import { GanhadoresComponent } from '../../ganhadores/ganhadores.component';
import { MeusNumerosComponent } from '../../meus-numeros/meus-numeros.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TermosComponent } from '../../termos/termos.component';
import { TelMaskDirective } from 'src/app/directives/tel-mask.directive';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { AdicionarSorteiosComponent } from '../../adicionar-sorteios/adicionar-sorteios.component';
import { ClipboardModule } from 'ngx-clipboard';
import { LoginAdminComponent } from 'src/app/login-admin/login-admin.component';
import { UpdateSorteiosComponent } from 'src/app/update-sorteios/update-sorteios.component';
import { AdicionarGanhadorComponent } from 'src/app/adicionar-ganhador/adicionar-ganhador.component';
import { BuscarRifasComponent } from 'src/app/buscar-rifas/buscar-rifas.component';


@NgModule({
  declarations: [
    CompraSorteioComponent,
    FinalizacaoCompraComponent,
    SorteiosComponent,
    GanhadoresComponent,
    MeusNumerosComponent,
    TermosComponent,
    TelMaskDirective,
    TruncatePipe,
    AdicionarSorteiosComponent,
    LoginAdminComponent,
    UpdateSorteiosComponent,
    AdicionarGanhadorComponent,
    BuscarRifasComponent,
  ],
  imports: [
    ClipboardModule,
    CommonModule,
    MaterialExampleModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],

  exports: [
    CompraSorteioComponent,
    FinalizacaoCompraComponent,
    SorteiosComponent,
    GanhadoresComponent,
    MeusNumerosComponent,
  ]
})
export class PagesModule { }
