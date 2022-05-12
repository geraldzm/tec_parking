import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CallAPI } from '../utils/api'

@Component({
  selector: 'app-payroll-crear-funcionario',
  templateUrl: './payroll-crear-funcionario.component.html',
  styleUrls: ['./payroll-crear-funcionario.component.css']
})
export class PayrollCrearFuncionarioComponent implements OnInit {
  constructor(private router: Router) { }

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
    useSecondEmailAsFavorite: '',
  }

  ngOnInit(): void {
    //this.estacionamiento.Nombre = '';
  }

  async Registrar() {
    console.log(this.user.area);
    const api = new CallAPI(this.router);
    const data = await api.callAPI({ url: environment.register, method: "POST", body: { user: this.user } });

    if (data.status === 200) {
      console.log("parkinglot created");
    }

  }
}
