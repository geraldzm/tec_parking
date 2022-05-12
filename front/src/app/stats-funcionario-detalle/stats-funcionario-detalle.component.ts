import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CallAPI } from '../utils/api'
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-stats-funcionario-detalle',
  templateUrl: './stats-funcionario-detalle.component.html',
  styleUrls: ['./stats-funcionario-detalle.component.css']
})
export class StatsFuncionarioDetalleComponent implements OnDestroy,OnInit {


//Dan formato a la tabla
dtOptions: DataTables.Settings = {};
dtTrigger = new Subject<any>();
data: any;


private id: string | undefined;

constructor(private _Activatedroute: ActivatedRoute, private router: Router) { 
}

user = {

  idNumber: '',
  role: '',
  area: {
    name: '',
    code: ''
  },
  phone: '',
  password: '',
  secondEmail: '',
  email: '',
  name: '',
  useSecondEmailAsFavorite: '',
  plates: '',
  schedule: {
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: '',
    sabado: '',
    domingo: '',
  }
}

ngOnInit(): void {

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    lengthMenu: [5,15,25],
    processing: true
  };

  
  const api = new CallAPI(this.router);
  api.callAPI({ url:environment.employees }).then((data) => {

  this.data = data.response;
  this.dtTrigger.next(data.response);
  
  });

  this._Activatedroute.paramMap.subscribe(params => {
    const rs = params.get('id');
    if (!rs) {
      return;
    }

    const user = JSON.parse(rs);
    this.id = user.id;
    this.user.idNumber = user.idNumber;
    this.user.role = user.role;
    this.user.area.name = user.area.name;
    this.user.area.code = user.area.code;
    this.user.phone = user.phone;
    this.user.password = user.password;
    this.user.secondEmail = user.secondEmail;
    this.user.email = user.email;
    this.user.name = user.name;
    this.user.plates = user.plates;
    this.user.useSecondEmailAsFavorite = user.useSecondEmailAsFavorite;
    this.user.schedule = user.schedule;
  });

}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

Detalle(id: any){
  this.router.navigate(['/statsFuncionarioDetalle/' + JSON.stringify(id)]);
}

}
