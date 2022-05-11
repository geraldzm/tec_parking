import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll-editar-funcionario',
  templateUrl: './payroll-editar-funcionario.component.html',
  styleUrls: ['./payroll-editar-funcionario.component.css']
})
export class PayrollEditarFuncionarioComponent implements OnInit {

  constructor() { }

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
    //Aqui hay que poner los datos cargados para que el usuario pueda verlos y modificarlos
    this.funcionario.idNumber = '117800854';
    this.funcionario.role = 'Admin';
    this.funcionario.areaName = 'Computacion';
    this.funcionario.areaCode = 'Com';
    this.funcionario.phone = '70540001';
    this.funcionario.password = 'Francisco';
    this.funcionario.secondEmail = 'frajavierchava06@gmail.com';
    this.funcionario.email = 'frajavierchava06@itcr.ac.cr';
    this.funcionario.name = 'Francisco Chavarro';
    this.funcionario.useSecondEmailAsFavorite = 'True';
  }

  Editar(){

    console.log(this.funcionario.name);
  }

}
