import { AdicionarGanhadorComponent } from './adicionar-ganhador/adicionar-ganhador.component';
import { BuscarRifasComponent } from './buscar-rifas/buscar-rifas.component';
import { UpdateSorteiosComponent } from './update-sorteios/update-sorteios.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdicionarSorteiosComponent } from './pages/adicionar-sorteios/adicionar-sorteios.component';
import { FinalizacaoCompraComponent } from './pages/finalizacao-compra/finalizacao-compra.component';
import { CompraSorteioComponent } from './pages/compra-sorteio/compra-sorteio.component';
import { TermosComponent } from './pages/termos/termos.component';
import { MeusNumerosComponent } from './pages/meus-numeros/meus-numeros.component';
import { GanhadoresComponent } from './pages/ganhadores/ganhadores.component';
import { SorteiosComponent } from './pages/sorteios/sorteios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "sorteios", component: SorteiosComponent},
  {path: "ganhadores", component: GanhadoresComponent},
  {path: "pedidos", component: MeusNumerosComponent},
  {path: "terms", component: TermosComponent},
  {path: "sorteios/:name", component: CompraSorteioComponent},
  {path: "checkup/:codigo", component: FinalizacaoCompraComponent},
  {path: "fuller-398567-3843833", component: LoginAdminComponent},
  {path: "fuller-398567-3843833/adicionarSorteio", component: AdicionarSorteiosComponent},
  {path: "fuller-398567-3843833/updateSorteio/:titulo", component: UpdateSorteiosComponent},
  {path: "fuller-398567-3843833/buscarRifas", component: BuscarRifasComponent},
  {path: "fuller-398567-3843833/adicionarGanhador", component: AdicionarGanhadorComponent},
  {path: "", pathMatch: "full", redirectTo: "sorteios"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
