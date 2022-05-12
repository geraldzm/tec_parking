import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CallAPI } from '../utils/api'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-stats-estacionamientos',
  templateUrl: './stats-estacionamientos.component.html',
  styleUrls: ['./stats-estacionamientos.component.css']
})
export class StatsEstacionamientosComponent implements OnDestroy,OnInit {

//Dan formato a la tabla
dtOptions: DataTables.Settings = {};
dtTrigger = new Subject<any>();
data: any;

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
  this.data = api.callAPI({ url:environment.allParkinLots }).then((data) => {
  this.data = data.response;
  this.dtTrigger.next(data.response);

  console.log(data.response);

  });


  
}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

}
