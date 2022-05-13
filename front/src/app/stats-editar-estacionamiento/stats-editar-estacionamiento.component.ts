import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallAPI } from '../utils/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-stats-editar-estacionamiento',
  templateUrl: './stats-editar-estacionamiento.component.html',
  styleUrls: ['./stats-editar-estacionamiento.component.css']
})
export class StatsEditarEstacionamientoComponent implements OnInit {


  private id: string | undefined;

  constructor(private _Activatedroute: ActivatedRoute, private router: Router) {
  }

  public edit = false;

  public parkinglot : any;

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      
      const rs = params.get('id');
      if (!rs) {
        return;
      }
  
      const api = new CallAPI(this.router);
      api.callAPI({ url:environment.parkingById +JSON.parse(rs).id, method: "GET", withAuth:true}).then((data) => {

        if(data.status === 200) {
          this.parkinglot = data.response;

          this.parkinglot.startContract = null;
          this.parkinglot.endContract = null;
          this.id = data.response.id;
        } 
        
        //console.log(this.parkinglot);
      });
    });
  }

  async Editar() {
    
    const body = {
      parkinglot: {
        id: this.id, ...this.parkinglot
      }
    }

    const api = new CallAPI(this.router);
    const data = await api.callAPI({ url: environment.updateParking, method: "POST", body: body });

    if (data.status === 200) {
      this.router.navigate(['/payrollEstacionamientos']);
    }

    //console.log(this.parkinglot);

  }

  change(event: any) {

    if (event.target.value == "Propio"){
      
      document.getElementById('telefono')?.setAttribute("disabled","disabled");
      document.getElementById('owner')?.setAttribute("disabled","disabled");
      document.getElementById('startC')?.setAttribute("disabled","disabled");
      document.getElementById('endC')?.setAttribute("disabled","disabled");
    }else{
      document.getElementById('telefono')?.removeAttribute("disabled");
      document.getElementById('owner')?.removeAttribute("disabled");
      document.getElementById('startC')?.removeAttribute("disabled");
      document.getElementById('endC')?.removeAttribute("disabled");
    }
  }

}
