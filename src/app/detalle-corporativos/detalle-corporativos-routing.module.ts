import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleCorporativosComponent } from './detalle-corporativos.component';


const routes: Routes = [
  {
    path: '', component: DetalleCorporativosComponent, data: { title: 'DetalleCorporativos' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCorporativosRoutingModule { }
