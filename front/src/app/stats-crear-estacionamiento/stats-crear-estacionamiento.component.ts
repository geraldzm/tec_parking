import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-crear-estacionamiento',
  templateUrl: './stats-crear-estacionamiento.component.html',
  styleUrls: ['./stats-crear-estacionamiento.component.css']
})
export class StatsCrearEstacionamientoComponent implements OnInit {

  constructor() { }

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

  Registrar(){
    console.log(this.estacionamiento.Edificio);
  }

}
