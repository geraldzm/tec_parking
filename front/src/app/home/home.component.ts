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



  constructor(private router: Router) { }

  //Ahora esta en true para poder ver los botones, pero en caso de no ser admi seria false
  public isAdmin = false;

  ngOnInit(): void {

  const user = getUser();
  //Aqui es donde verificamos si el usuario puede ver o no ver los botones
  if(user.role == 'admin' || user.role == 'Admin'){
    this.isAdmin = true;
  }
  console.log("user: " + user.email + " " + user.name + " " + user.role);  
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
