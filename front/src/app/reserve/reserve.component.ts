import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  constructor() { }

  reserva = {

    Edificio: '',
    Correo: '',
    FechaRegistro: '',
  }

  ngOnInit(): void {
  }

  Reservar(){
    Swal.fire(
      "Aun no se puede reservar :("
    )
  }

}
