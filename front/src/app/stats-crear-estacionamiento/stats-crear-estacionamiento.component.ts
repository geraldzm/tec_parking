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
    
    console.log(this.estacionamiento);
    
    const api = new CallAPI(this.router);
    const data = await api.callAPI({ url:environment.createParkingLot, method: "POST", body: {parkinglot: this.estacionamiento}});

    if(data.status === 200 ) {
      console.log("parkinglot created");
    } 

  }

change(event: any) {

  if (event.target.value == "Propio"){
    
    document.getElementById('telefono')?.setAttribute("disabled","disabled");
    document.getElementById('owner')?.setAttribute("disabled","disabled");
    document.getElementById('startC')?.setAttribute("disabled","disabled");
    document.getElementById('endC')?.setAttribute("disabled","disabled");
  }else{
    document.getElementById('telefono')?.removeAttribute("disabled");
    document.getElementById('owner')?.removeAttribute("disabled");
    document.getElementById('startC')?.removeAttribute("disabled");
    document.getElementById('endC')?.removeAttribute("disabled");
  }
}

}
