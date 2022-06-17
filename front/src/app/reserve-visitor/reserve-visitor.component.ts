import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CallAPI } from '../utils/api';

@Component({
  selector: 'app-reserve-visitor',
  templateUrl: './reserve-visitor.component.html',
  styleUrls: ['./reserve-visitor.component.css']
})
export class ReserveVisitorComponent implements OnInit {

  constructor(private router: Router) { }

  plates : any;
  user : any;
  parkinglots: any;

  //Aqui esta el form de reserva.
  reserva = {
    visitorName: '',
    visitorId: '',
    reason: '',
    place: '',
    userId: '',
    start: '',
    end: '',
    plate: '',
    parkinglotId: ''
  }

  ngOnInit(): void {
    const api = new CallAPI(this.router);
    api.callAPI({ url:environment.userInfo}).then((data) => {
      if(data.status === 200) {
        this.user = data.response;
        //console.log(data.response);
        this.reserva.userId = this.user.id;
      }             
    });
    this.parkinglots = api.callAPI({ url:environment.allParkinLots }).then((data) => {
    this.parkinglots = data.response.filter((p: { type: string; }) => p.type == 'Alquilado');
    });
  }

  async Reservar(){

    console.log(this.reserva);
    
    const api = new CallAPI(this.router);
    const data = await api.callAPI({url:environment.createVisitorReserve, method: "POST", body: {reservation: this.reserva}});

    if(data.status === 200 ) {
      Swal.fire(
        "La reserva se registró correctamente"
      )
    } else{
      Swal.fire(
        "Ocurrió un error, intente nuevamente"
      )
    }
  }

}
