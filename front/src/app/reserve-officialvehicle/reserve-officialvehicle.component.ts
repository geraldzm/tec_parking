import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CallAPI } from '../utils/api';

@Component({
  selector: 'app-reserve-officialvehicle',
  templateUrl: './reserve-officialvehicle.component.html',
  styleUrls: ['./reserve-officialvehicle.component.css']
})
export class ReserveOfficialVehicleComponent implements OnInit {

  constructor(private router: Router) { }
  colors : any;
  user : any;
  parkinglots: any;


  //Aqui esta el form de reserva.
  reserva = {
    userId: '',
    parkinglotId: '',
	plate: '',
	carModel: '',
	carColor: '',
	driver: ''
  }

  ngOnInit(): void {

    const api = new CallAPI(this.router);
    api.callAPI({ url:environment.userInfo}).then((data) => {
      if(data.status === 200) {
        this.user = data.response;
        //console.log(data.response);
        this.reserva.userId = this.user.id;
        this.reserva.parkinglotId = this.user.parkinglotId;
      }             
    });
    this.parkinglots = api.callAPI({ url:environment.allParkinLots }).then((data) => {
    this.parkinglots = data.response;
    });

    this.colors = ['Amarillo', 'Azul', 'Blanco', 'Celeste','Rojo', 'Escarlata', 'Verde', 'Esmeralda', 
                'Jade', 'Zafiro', 'Añil', 'Magenta', 'Fucsia', 'Morado', 'Lila', 'Salmón', 'Rosado', 
                'Cian', 'Turquesa', 'Menta', 'Dorado', 'Plateado', 'Marrón', 'Ocre', 'Violeta', 'Naranja',
                'Beige', 'Negro', 'Hueso', 'Márfil', 'Gris'];
  }

  async Reservar(){
    
    const api = new CallAPI(this.router);
    const data = await api.callAPI({url:environment.createOfficialVehicleReserve, method: "POST", body: {reservation: this.reserva}});

    if(data.status === 200 ) {
      Swal.fire(
        "El vehículo se registró correctamente"
      )
    } 
    else{
      Swal.fire(
        "Ocurrió un error, intente nuevamente"
      )
    }
  }
}
