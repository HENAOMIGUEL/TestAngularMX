import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporativosComponent } from './corporativos.component';


const routes: Routes = [
  {
    path: '', component: CorporativosComponent, data: { title: 'Corporativos' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporativosRoutingModule { }
