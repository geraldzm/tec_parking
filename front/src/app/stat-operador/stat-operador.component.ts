import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CallAPI } from '../utils/api'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-stat-operador',
  templateUrl: './stat-operador.component.html',
  styleUrls: ['./stat-operador.component.css']
})
export class StatOperadorComponent implements OnDestroy,OnInit {

//Dan formato a la tabla
dtOptions: DataTables.Settings = {};
dtTrigger = new Subject<any>();
parking: any;
user: any;
filter = {
    start:'',
    end: ''
}

constructor(private http: HttpClient, private router: Router) { 
}

async ngOnInit() {

  this.dtOptions = {
    pagingType: 'full_numbers',
    //Numero de opciones por pagina
    pageLength: 5,
    //Numero de opciones que se podran escoger
    lengthMenu: [5,15,25],
    processing: true
  };

  const api = new CallAPI(this.router);
  this.user = (await api.callAPI({ url:environment.userInfo})).response;
  const urlFinal = environment.parkingDetailsOperator+this.user.parkinglotId+'&start=0&end=0';
  this.parking = (await api.callAPI({ url:urlFinal, method: "GET"})).response;
  this.dtTrigger.next(this.parking.response);

}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

async Filtrar() {
    console.log(this.filter);
    const api = new CallAPI(this.router);
    const urlFinal = environment.parkingDetailsOperator+this.user.parkinglotId+'&start='+this.filter.start+'&end='+this.filter.end;
    this.parking = (await api.callAPI({ url:urlFinal, method: "GET"})).response;
}

}
