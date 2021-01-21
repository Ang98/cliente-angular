import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router'
import { ClienteComponent } from './admin/cliente/cliente.component';
import { ClientesComponent } from './admin/clientes/clientes.component';
const routes: Routes = [
  {path: 'clientes',component: ClientesComponent},
  {path: 'cliente/:id',component: ClienteComponent},
  {path: '**',pathMatch:'full',redirectTo:'clientes'}
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    CommonModule,
    RouterModule
  ]
})
export class RoutingModule { }
