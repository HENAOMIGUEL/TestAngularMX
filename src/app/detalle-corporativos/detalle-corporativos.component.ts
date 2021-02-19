import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralServices } from 'app/generales/_services/generalServices';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-corporativos',
  templateUrl: './detalle-corporativos.component.html',
  styleUrls: ['./detalle-corporativos.component.scss']
})
export class DetalleCorporativosComponent implements OnInit {

  public generalInfoForm: FormGroup;//corporative information
  public contactInfoForm: FormGroup;//corporative contact form 

  constructor(private router: Router, private generalService: GeneralServices, private spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.spinner.show();
    this.buildForms();
  }

  corporativo: any = {};
  showSaveBtn = false;
  showCreateContactBtn = true;

  idConctactSelected;// i have this here to know who im going to update

  ngOnInit(): void {

    this.getCorporativeInfo().then((answer: any) => {
      this.corporativo = answer.data.corporativo;
      this.fillDataForms();
      this.spinner.hide();
    });

  }

  getCorporativeInfo() {

    return new Promise((resolve, reject) => {
      this.generalService.getAPIServiceCorporativosDetail(this.activatedRoute.snapshot.paramMap.get("id"))
        .subscribe((data: any) => {
          resolve(data);
        })
    })


  }
  buildForms() {
    this.generalInfoForm = this.formBuilder.group({
      shortName: [{ value: '', disabled: true }],
      completeName: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }],
      incorporationDate: [{ value: '', disabled: true }],
      systemUrl: [{ value: '', disabled: true }]
    });

    this.contactInfoForm = this.formBuilder.group({
      name: ['', Validators.required],
      job: ['', Validators.required],
      coments: ['', Validators.required],
      tel: [null, Validators.required],
      cel: ['', Validators.required],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
  }


  TEST() {
    console.log(this.generalInfoForm.value);
  }
  fillDataForms() {
    this.generalInfoForm.patchValue({
      shortName: this.corporativo.S_NombreCorto,
      completeName: this.corporativo.S_NombreCompleto,
      status: this.corporativo.S_Activo,
      incorporationDate: this.corporativo.D_FechaIncorporacion.slice(0, 10),
      systemUrl: this.corporativo.S_SystemUrl,
    })

  }

  allowForm() {
    this.showSaveBtn = true;
    Object.keys(this.generalInfoForm.controls).forEach(
      key => {
        this.generalInfoForm.get(key).enable();
      });
  }

  goBack() {
    this.router.navigate(['corporativos'])
  }

  saveInfo() {
    this.spinner.show();
    this.generalService.updateCorporativosInfo({
      "id": this.corporativo.id,
      "S_NombreCorto": this.generalInfoForm.get('shortName').value,
      "S_NombreCompleto": this.generalInfoForm.get('completeName').value,
      "S_SystemUrl": this.generalInfoForm.get('systemUrl').value,
      "S_Activo": this.generalInfoForm.get('status').value,
      "D_FechaIncorporacion": this.generalInfoForm.get('incorporationDate').value,
      "S_LogoURL": this.corporativo.S_LogoURL,
      "FK_Asignado_id": this.corporativo.FK_Asignado_id
    }).subscribe((data: any) => {
      this.spinner.hide()
      this.swalExito('Informacion guardada exitosamente!');
    })
  }

  fillContactToEdit(contactSelected) {
    this.idConctactSelected = contactSelected.id;
    this.contactInfoForm.patchValue({
      name: contactSelected.S_Nombre,
      job: contactSelected.S_Puesto,
      coments: contactSelected.S_Comentarios,
      tel: contactSelected.N_TelefonoFijo,
      cel: contactSelected.N_TelefonoMovil,
      email: contactSelected.S_Email
    })
    this.showCreateContactBtn = false;
  }

  createOrEditContact(type) {
    if (this.contactInfoForm.valid) {
      this.spinner.show();

      var json = {
        "S_Nombre": this.contactInfoForm.get('name').value,
        "S_Puesto": this.contactInfoForm.get('job').value,
        "S_Comentarios": this.contactInfoForm.get('coments').value,
        "N_TelefonoFijo": this.contactInfoForm.get('tel').value,
        "N_TelefonoMovil": this.contactInfoForm.get('cel').value,
        "S_Email": this.contactInfoForm.get('email').value,
        "tw_corporativo_id": this.corporativo.id
      };
      if (type == 'update') {
        this.generalService.updateContact(json, this.idConctactSelected).subscribe((data: any) => {
          this.getCorporativeInfo().then((answer: any) => {
            this.corporativo = answer.data.corporativo;
            this.spinner.hide();
            this.swalExito('Se ha modificado el contacto con exito!');
          });
        });
      } else if (type == 'new') {
        this.generalService.createContact(json).subscribe((data: any) => {
          this.getCorporativeInfo().then((answer: any) => {
            this.corporativo = answer.data.corporativo;
            this.spinner.hide();
            this.swalExito('Se ha creado el contacto con exito!');
          });
        })
      }
    } else {
      this.swalWarning('Faltan datos, o estan mal escritos. por favor revise y vuelva a intenatarlo.');
      //RED MESAGES AND MODAL
    }
  }


  deleteContact(contactSelected) {
    swal.fire({
      title: 'Estas seguro de borrarlo?',
      text: "no podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#975aff',
      cancelButtonColor: '#6c677b',
      confirmButtonText: 'Aceptar'
    }).then((result) => {

      if (result.value) {
        this.generalService.deleteContact(contactSelected.id).subscribe((data: any) => {
          this.spinner.show();
          this.getCorporativeInfo().then((answer: any) => {
            this.corporativo = answer.data.corporativo;
            this.spinner.hide();

            swal.fire(
              'Borrado!',
              'se ha borrado el contacto.',
              'success'
            )
          });
        });

      }
    })
  }


  swalExito(msg){
    swal.fire({
      icon: 'success',
      title: 'Exito',
      text: msg,
      showConfirmButton: false,
      timer: 4000,
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false,
    });
  }

  swalWarning(msg){
    swal.fire({
      icon: 'warning',
      title: 'Atención!',
      text: msg,
      showConfirmButton: false,
      timer: 4000,
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false,
    });
  }


}
