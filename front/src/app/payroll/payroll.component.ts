import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Estacionamiento(){
    this.router.navigate(['/payrollEstacionamientos']);
  }

  Funcionario(){
    this.router.navigate(['/payrollFuncionarios']);
  }

  Volver(){
    this.router.navigate(['/home']);
  }

}
