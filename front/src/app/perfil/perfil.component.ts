import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor() { }


  perfil = {

    id: '',
    plates: '',
    secondEmail: '',
    scheduleStart: '',
    scheduleEnd: '',
  }

  ngOnInit(): void {
    //this.estacionamiento.Nombre = '';
  }

  Update(){
    console.log(this.perfil.id);
  }

}
