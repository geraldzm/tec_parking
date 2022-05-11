import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CallAPI, getUser } from '../utils/api'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-payroll-funcionarios',
  templateUrl: './payroll-funcionarios.component.html',
  styleUrls: ['./payroll-funcionarios.component.css']
})
export class PayrollFuncionariosComponent implements OnDestroy,OnInit {

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
  const api = new CallAPI(this.router);
  api.callAPI({ url:environment.employees }).then((data) => {
    
    console.log("Funcionarios");
    console.log(data.response);
    
  });

  const user = getUser();
  console.log("user: " + user.email + " " + user.name + " " + user.role);  

}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

Agregar(){
  this.router.navigate(['/payrollCrearFuncionario']);
}

Editar(id : any){

  console.log(id);
  this.router.navigate(['/payrollEditarFuncionario']);
}

Eliminar(id : any){
  console.log(id);
  this.router.navigate(['/payrollCrearFuncionario']);
}

}
