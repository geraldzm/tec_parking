import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CallAPI } from '../utils/api'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-payroll-estacionamientos',
  templateUrl: './payroll-estacionamientos.component.html',
  styleUrls: ['./payroll-estacionamientos.component.css']
})
export class PayrollEstacionamientosComponent implements OnDestroy,OnInit {

//Dan formato a la tabla
dtOptions: DataTables.Settings = {};
dtTrigger = new Subject<any>();
data: any;

delete = {
  idparking: '',
}

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



  const api = new CallAPI(this.router);
  api.callAPI({ url:environment.allParkinLots }).then((data) => {
    
    console.log("Parkinglot data");
    console.log(data.response);
    this.data = data.response;
  });

  

}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

Agregar(){
  this.router.navigate(['/statsCrearEstacionamientos']);
}


Editar(ID: any){
  this.router.navigate(['/statsEditarEstacionamientos/' + JSON.stringify({id: ID})]);
}



async Eliminar(id: any){

  this.delete.idparking = id;
  const api = new CallAPI(this.router);
  const data = await api.callAPI({ url:environment.deleteParking, method: "DELETE", body: this.delete});

  if(data.status === 200) {
    window.location.reload();
  } 
}


}
