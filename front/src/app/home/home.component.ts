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
  public isButtonVisible = true;

  ngOnInit(): void {
  //Aqui es donde verificamos si el usuario puede ver o no ver los botones
  /*if(user.role == 'Admi'){
    public isButtonVisible = true;
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




}
