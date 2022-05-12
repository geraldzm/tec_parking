import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll-crear-funcionario',
  templateUrl: './payroll-crear-funcionario.component.html',
  styleUrls: ['./payroll-crear-funcionario.component.css']
})
export class PayrollCrearFuncionarioComponent implements OnInit {
  constructor() { }

  //user
  funcionario = {

    idNumber: '',
    role: '',
    areaName: '',
    areaCode: '',
    phone: '',
    password: '',
    secondEmail: '',
    email: '',
    name: '',
    useSecondEmailAsFavorite: '',
  }

  ngOnInit(): void {
    //this.estacionamiento.Nombre = '';
  }

  Registrar(){
    console.log(this.funcionario.name);
  }

}
