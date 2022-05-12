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

  public created = false;


  parkinglot = {
    building: '',
    name: '',
    disabledSpaces: '',
    vehiclesSpaces: '',
    administrativeSpaces: '',
    othersSpaces: '',
    schedule: {
      startHour:'',
      endHour:''
    },
    type: '',
    phone: '',
    ownerName: '',
    startContract: '',
    endContract: '',
  }

  ngOnInit(): void {
    //this.estacionamiento.Nombre = '';
  }

  async Registrar() {
    
    console.log(this.parkinglot);
    
    const api = new CallAPI(this.router);
    const data = await api.callAPI({ url:environment.createParkingLot, method: "POST", body: {parkinglot: this.parkinglot}});

    if(data.status === 200 ) {
      console.log("parkinglot created");
      this.created = true;
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
