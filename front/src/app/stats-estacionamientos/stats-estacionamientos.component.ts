import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

ngOnInit(): void {

  this.dtOptions = {
    pagingType: 'full_numbers',
    //Numero de opciones por pagina
    pageLength: 5,
    //Numero de opciones que se podran escoger
    lengthMenu: [5,15,25],
    processing: true
  };

  this.http.get('https://dummy.restapiexample.com/api/v1/employees').subscribe(console.log);
  
  this.http.get('https://dummy.restapiexample.com/api/v1/employees')
  .subscribe((res: any) =>{
    this.data = res.data;
    this.dtTrigger.next(res.data);
  });
}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

}