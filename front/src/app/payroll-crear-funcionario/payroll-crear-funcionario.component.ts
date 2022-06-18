import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { CallAPI } from '../utils/api'
import as from '../utils/areas'


@Component({
  selector: 'app-payroll-crear-funcionario',
  templateUrl: './payroll-crear-funcionario.component.html',
  styleUrls: ['./payroll-crear-funcionario.component.css']
})
export class PayrollCrearFuncionarioComponent implements OnInit {
  constructor(private router: Router) { }

  areas: any;
  parkinglots : any;

  //user
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
    useSecondEmailAsFavorite: true,
    profile: '',
    disabled: false,
    parkinglotId: ''
  }

  ngOnInit(): void {
    //this.estacionamiento.Nombre = '';

    this.areas = as.areas;
    this.user.area = this.areas[0];

    const api = new CallAPI(this.router);
    this.parkinglots = api.callAPI({ url:environment.allParkinLots }).then((data) => {
    this.parkinglots = data.response;
    });
  }

  async Registrar() {

    const api = new CallAPI(this.router);
    const data = await api.callAPI({ url: environment.register, method: "POST", body: { user: this.user } });

    if (data.status === 200) {
      Swal.fire(
        "Se ha registrado el funcionario correctamente"
      )
      console.log("user created");
    }
    else{
      Swal.fire(
        "Ocurrió un problema inesperado, intente nuevamente"
      )
    }

  }

  changeSecondEmail(event: any) {
    if (event.target.value === "true") this.user.useSecondEmailAsFavorite = true;
    else this.user.useSecondEmailAsFavorite = false; 
  }

  changeDisabledPerson(event: any) {
    if (event.target.value === "true") this.user.disabled = true;
    else this.user.disabled = false; 
  }

  changeArea(event: any){
    var area = event.target.value.split(',');
    this.user.area.code = area[0];
    this.user.area.name = area[1];
  }

  changeRol(event: any) {

    if (event.target.value == "admin"){
      
      document.getElementById('profile')?.setAttribute("disabled","disabled");
      document.getElementById('parkinglot')?.setAttribute("disabled","disabled");
      this.user.profile = 'admin';
      this.user.parkinglotId = '';
    }else{
      document.getElementById('profile')?.removeAttribute("disabled");
    }
  }

  changeProfile(event: any) {
    if (event.target.value === "operador") {
      document.getElementById('parkinglot')?.removeAttribute("disabled");
    }else{
      document.getElementById('parkinglot')?.setAttribute("disabled","disabled");
      this.user.parkinglotId = '';
    }
  }

}
