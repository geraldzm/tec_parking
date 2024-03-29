import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Estacionamiento(){
    this.router.navigate(['/statsEstacionamientos']);
  }

  Funcionario(){
    this.router.navigate(['/statsFuncionarios']);
  }

  FranjaHoraria(){
    this.router.navigate(['/statsFranja']);
  }

  Volver(){
    this.router.navigate(['/home']);
  }
}
