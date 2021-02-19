import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DireccionesServices } from 'app/generales/_services/catalogos-direcciones.services';
import { GeneralServices } from 'app/generales/_services/generalServices';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-corporativos',
  templateUrl: './corporativos.component.html',
  styleUrls: ['./corporativos.component.scss']
})
export class CorporativosComponent implements OnInit {

  constructor(private generalService: GeneralServices, private router: Router, private spinner: NgxSpinnerService) { }

  corporativos: any[] = [];
  page :number= 1; //paginator
  pageSize:number = 5;
  ngOnInit() {
    this.spinner.show();
    this.getCorporativos();
  }

  getCorporativos() {
    this.generalService.getAPIServiceCorporativos().subscribe((corporativos: any) => {
      this.corporativos = corporativos.data;
      this.spinner.hide();
    })
  }

  go(idCorporativa) {
    this.router.navigate(['corporativos/detalle', idCorporativa]);
  }


}
