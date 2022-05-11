import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(private router: Router) { }

  //Ahora esta en true para poder ver los botones, pero en caso de no ser admi seria false
  public isAdmin = true;
  public isUser = false;

  ngOnInit(): void {
  //Aqui es donde verificamos si el usuario puede ver o no ver los botones
  /*if(user.role == 'Admi'){
    this.isAdmin = true;
    this.isUser = false;
  }*/
  }

  Consultar(){
    this.router.navigate(['/stats']);
  }

  Reservar(){
    this.router.navigate(['/reserve']);
  }

  Planilla(){
    this.router.navigate(['/payroll']);
  }

  Perfil(){
    this.router.navigate(['/perfil']);
  }




}
