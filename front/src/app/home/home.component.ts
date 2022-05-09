import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
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
