import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ListReservasComponent } from './list-reservas/list-reservas.component';
import { LoginComponent } from './login/login.component';
import { SubirImagenComponent } from './subir-imagen/subir-imagen.component';

const routes: Routes = [
{ path: '', component: FormularioComponent },
 { path: 'formulario', component: FormularioComponent },
 { path: 'admin', component: AdminComponent },
 { path: 'login', component: LoginComponent },
 { path: 'subir', component: SubirImagenComponent },
 { path: 'list', component: ListReservasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
