import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-crear-estacionamiento',
  templateUrl: './stats-crear-estacionamiento.component.html',
  styleUrls: ['./stats-crear-estacionamiento.component.css']
})
export class StatsCrearEstacionamientoComponent implements OnInit {

  constructor() { }

  estacionamiento = {

    Nombre: '',
    Ubicacion: '',
    FechaRegistro: '',
    Espacios: '',
    Discapacitados: '',
  }

  ngOnInit(): void {
    this.estacionamiento.Nombre = 'Luis';
  }

}
