import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CallAPI } from '../utils/api';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  constructor(private router: Router) { }

  plates : any;
  user : any;
  parkinglots: any;

  //Aqui esta el form de reserva.
  reserva = {
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
    this.parkinglots = data.response;
    });
  }

  async Reservar(){

    console.log(this.reserva);
    
    const api = new CallAPI(this.router);
    const data = await api.callAPI({url:environment.createFunctionaryReserve, method: "POST", body: {reservation: this.reserva}});

    if(data.status === 200 ) {
      Swal.fire(
        "La reserva se registró correctamente"
      )
    } 
    else{
      Swal.fire(
        "Ocurrió un error, intente nuevamente"
      )
    }
  }

}
