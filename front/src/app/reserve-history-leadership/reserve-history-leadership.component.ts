import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CallAPI, getUser } from '../utils/api'
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserve-history-leadership',
  templateUrl: './reserve-history-leadership.component.html',
  styleUrls: ['./reserve-history-leadership.component.css']
})
export class ReserveHistoryLeadershipComponent implements OnDestroy,OnInit {

//Dan formato a la tabla
dtOptions: DataTables.Settings = {};
dtTrigger = new Subject<any>();
data: any;
user: any;

constructor(private http: HttpClient, private router: Router) { 
}

async ngOnInit(): Promise<any> {

  this.dtOptions = {
    pagingType: 'full_numbers',
    //Numero de opciones por pagina
    pageLength: 5,
    //Numero de opciones que se podran escoger
    lengthMenu: [5,15,25],
    processing: true
  };
  
  const api = new CallAPI(this.router);

  this.user = (await api.callAPI({ url:environment.userInfo})).response;
  //console.log(this.user);
  this.data = (await api.callAPI({ url:environment.reservesByLeadershipUser+this.user.id, method: "GET"})).response;
  
}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

async Eliminar(id : any){
  
  const api = new CallAPI(this.router);
  const data = await api.callAPI({ url:environment.deleteReserve, method: "DELETE", body: {reservationId : id}});

  if(data.status === 200) {
    window.location.reload();
    Swal.fire(
      "Se ha eliminado la reserva"
    )
  }
  else{
    Swal.fire(
      "Ocurrió un error inesperado, intente nuevaente"
    )
  }
}
}
