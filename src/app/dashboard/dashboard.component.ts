import { DireccionesServices } from './../generales/_services/catalogos-direcciones.services';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  constructor (private router : Router ) {

  }



}
