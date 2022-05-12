import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallAPI } from '../utils/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-payroll-editar-funcionario',
  templateUrl: './payroll-editar-funcionario.component.html',
  styleUrls: ['./payroll-editar-funcionario.component.css']
})
export class PayrollEditarFuncionarioComponent implements OnInit {

  private id: string | undefined;

  constructor(private _Activatedroute: ActivatedRoute, private router: Router) { }

  user = {

    idNumber: '',
    role: '',
    area: {
      name: '',
      code: ''
    },
    phone: '',
    password: '',
    secondEmail: '',
    email: '',
    name: '',
    useSecondEmailAsFavorite: '',
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      const rs = params.get('id');
      if (!rs) {
        return;
      }
      //Aqui hay que poner los datos cargados para que el usuario pueda verlos y modificarlos
      this.user.idNumber = '117800854';
      this.user.role = 'Admin';
      this.user.area.name = 'Computacion';
      this.user.area.code = 'Com';
      this.user.phone = '70540001';
      this.user.password = 'Francisco';
      this.user.secondEmail = 'frajavierchava06@gmail.com';
      this.user.email = 'frajavierchava06@itcr.ac.cr';
      this.user.name = 'Francisco Chavarro';
      this.user.useSecondEmailAsFavorite = 'True';
    });

  }

  async Editar() {
    /*
      const body = {
        user: {
          id: this.id, ...this.user
  
        }
      }
  
      const api = new CallAPI(this.router);
      const data = await api.callAPI({ url: environment.updateUser, method: "POST", body: body });
  
      if (data.status === 200) {
        this.router.navigate(['/payrollFuncionarios']);
      }
    }
    */

  }
}
