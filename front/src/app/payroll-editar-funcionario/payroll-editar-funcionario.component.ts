import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallAPI } from '../utils/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import as from '../utils/areas'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payroll-editar-funcionario',
  templateUrl: './payroll-editar-funcionario.component.html',
  styleUrls: ['./payroll-editar-funcionario.component.css']
})
export class PayrollEditarFuncionarioComponent implements OnInit {

  constructor(private _Activatedroute: ActivatedRoute, private router: Router) { }
  
  areas: any;
  user : any;

  ngOnInit(): void {

    this.areas = as.areas;

    this._Activatedroute.paramMap.subscribe(params => {
      const rs = params.get('id');
      
      if (!rs) {
        return;
      }

      const api = new CallAPI(this.router);
      api.callAPI({ url:environment.employeeById +JSON.parse(rs).id, method: "GET", withAuth:true}).then((data) => {
        if(data.status === 200) {
          this.user = data.response;
          this.user.password = "";
        }
      });
    });
  }

  async Editar() {

      const body = {
        user: {
          ...this.user
        }
      }
      const api = new CallAPI(this.router);
      const data = await api.callAPI({ url: environment.editUser, method: "PUT", body: body });
  
      if (data.status === 200) {
        Swal.fire(
          "Se han guardado los cambios"
        )
        this.router.navigate(['/payrollFuncionarios']);
      }
      else{
        Swal.fire(
          "Ocurrió un problema inesperado, intente nuevamente"
        )
      }
  }

  changeSecondEmail(event: any) {
    if (event.target.value === "true") this.user.useSecondEmailAsFavorite = true;
    else this.user.useSecondEmailAsFavorite = false; 
  }


  changeArea(event: any){
    var area = event.target.value.split(',');
    this.user.area.code = area[0];
    this.user.area.name = area[1];
  }

}
