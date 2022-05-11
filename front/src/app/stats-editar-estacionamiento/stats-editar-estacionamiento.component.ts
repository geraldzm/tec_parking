import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-editar-estacionamiento',
  templateUrl: './stats-editar-estacionamiento.component.html',
  styleUrls: ['./stats-editar-estacionamiento.component.css']
})
export class StatsEditarEstacionamientoComponent implements OnInit {

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
    this.estacionamiento.Edificio = 'Casa verde';
    this.estacionamiento.Nombre = 'Casa verde';
    this.estacionamiento.Discapacitados = '10';
    this.estacionamiento.Vehiculos = '50';
    this.estacionamiento.Administrativos = '50';
    this.estacionamiento.Otros = '20';
    this.estacionamiento.Tipo = 'Principal';
    this.estacionamiento.Numero = '70540001';
    this.estacionamiento.Propietario = 'Tec';
    this.estacionamiento.InicioContrato = '11/05/2010';
    this.estacionamiento.FinContrato = 'Null';

  }

  Editar(){
    console.log(this.estacionamiento.Edificio);
  }

}
