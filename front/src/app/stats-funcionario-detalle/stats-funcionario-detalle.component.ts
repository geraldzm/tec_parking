import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CallAPI } from '../utils/api'
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-stats-funcionario-detalle',
  templateUrl: './stats-funcionario-detalle.component.html',
  styleUrls: ['./stats-funcionario-detalle.component.css']
})
export class StatsFuncionarioDetalleComponent implements OnDestroy,OnInit {


//Dan formato a la tabla
dtOptions: DataTables.Settings = {};
dtTrigger = new Subject<any>();
data: any;


private id: string | undefined;

constructor(private _Activatedroute: ActivatedRoute, private router: Router) { 
}

user : any;

ngOnInit(): void {

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    lengthMenu: [5,15,25],
    processing: true
  };

  this._Activatedroute.paramMap.subscribe(params => {
    
    const rs = params.get('id');
    if (!rs) {
      return;
    }
  
    const api = new CallAPI(this.router);
    api.callAPI({ url:environment.employeeById +JSON.parse(rs).id, method: "GET", withAuth:true}).then((data) => {

      if(data.status === 200) {
        this.user = data.response;
        this.dtTrigger.next(data.response);
      } 
            
    });
  });

}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

Detalle(id: any){
  this.router.navigate(['/statsFuncionarioDetalle/' + JSON.stringify(id)]);
}

}
