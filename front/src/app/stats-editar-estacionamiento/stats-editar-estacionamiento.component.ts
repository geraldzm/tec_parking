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

  parkinglot = {
    building: '',
    name: '',
    disabledSpaces: '',
    vehiclesSpaces: '',
    administrativeSpaces: '',
    othersSpaces: '',
    schedule: {
      startHour: '',
      endHour: ''
    },
    type: '',
    phone: '',
    ownerName: '',
    startContract: '',
    endContract: '',
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      const rs = params.get('id');
      if (!rs) {
        return;
      }
      const parkinglot = JSON.parse(rs);
      this.id = parkinglot.id;
      this.parkinglot.building = parkinglot.building;
      this.parkinglot.name = parkinglot.name;
      this.parkinglot.disabledSpaces = parkinglot.disabledSpaces;
      this.parkinglot.vehiclesSpaces = parkinglot.vehiclesSpaces;
      this.parkinglot.administrativeSpaces = parkinglot.administrativeSpaces;
      this.parkinglot.othersSpaces = parkinglot.othersSpaces;
      this.parkinglot.schedule = parkinglot.schedule;
      this.parkinglot.type = parkinglot.type;
      this.parkinglot.phone = parkinglot.phone;
      this.parkinglot.ownerName = parkinglot.ownerName;
      this.parkinglot.startContract = parkinglot.startContract;
      this.parkinglot.endContract = parkinglot.endContract;



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
