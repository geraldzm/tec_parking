import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CallAPI } from '../utils/api'

@Component({
  selector: 'app-stats-crear-estacionamiento',
  templateUrl: './stats-crear-estacionamiento.component.html',
  styleUrls: ['./stats-crear-estacionamiento.component.css']
})
export class StatsCrearEstacionamientoComponent implements OnInit {


  constructor(private router: Router) { }


  estacionamiento = {

    Edificio: '',
    Nombre: '',
    Discapacitados: '',
    Vehiculos: '',
    Administrativos: '',
    Otros: '',
    Tipo: '',
    Numero: '',
    Propietario: '',
    InicioContrato: '',
    FinContrato: '',
  }

  ngOnInit(): void {
    //this.estacionamiento.Nombre = '';
  }

  async Registrar() {
    
    const api = new CallAPI(this.router);
    const data = await api.callAPI({ url:environment.createParkingLot, method: "POST", body: {parkinglot: this.estacionamiento}});

    if(data.status === 200 ) {
      console.log("parkinglot created");
    } 

  }

}
