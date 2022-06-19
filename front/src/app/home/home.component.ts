import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CallAPI, getUser } from '../utils/api'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user : any;

  constructor(private router: Router) { }

  //Ahora esta en true para poder ver los botones, pero en caso de no ser admi seria false
  public isAdmin = false;

  ngOnInit(): void {

  this.user = getUser();
  
  //Aqui es donde verificamos si el usuario puede ver o no ver los botones
  if(this.user.role == 'admin' || this.user.role == 'Admin'){
    this.isAdmin = true;
  }
  this.HabilitarBotones();
  console.log("user: " + this.user.email + " " + this.user.name + " " + this.user.role + " " + this.user.profile);  
  }

  Consultar(){
    this.router.navigate(['/stats']);
  }

  Reservar(){
    if (this.isAdmin || this.user.profile == 'estandar'){
      this.router.navigate(['/reserve']);
    }else if (this.user.profile == 'jefatura'){
      this.router.navigate(['/reserveleadership']);
    }
    else if (this.user.profile == 'operador'){
      this.router.navigate(['/reserveofficialvehicle']);
    }
  }

  Planilla(){
    this.router.navigate(['/payroll']);
  }

  Perfil(){
    this.router.navigate(['/perfil']);
  }

  Historial(){
    if (this.isAdmin || this.user.profile == 'estandar'){
      this.router.navigate(['/reservehistorystandarprofile']);
    }else if (this.user.profile == 'jefatura'){
      this.router.navigate(['/reservehistoryleadershipprofile']);
    }
    else if (this.user.profile == 'operador'){
      this.router.navigate(['/reservehistoryofficialvehicles']);
    }
  }


  Visitante(){
    this.router.navigate(['/reservehistoryvisitor']);
  }

  HabilitarBotones(){
    
    if (this.isAdmin || this.user.profile == 'jefatura'){
      var input = document.getElementById('visitantes') as HTMLInputElement | null;
      if (input){
        input.style.display = 'inline';
      }
    }
    if (this.user.profile == 'operador'){
      var input = document.getElementById('operador') as HTMLInputElement | null;
      if (input){
        input.style.display = 'inline';
      }
    }
  }

  logout(){
    this.router.navigate(['/login']);
  }

  ConsultaOperador(){
    this.router.navigate(['/statOperador']);
  }

}
