import { Component, OnInit } from '@angular/core';
import { CallAPI, getUser } from '../utils/api'
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private _Activatedroute: ActivatedRoute, private router: Router) { 
  }

  user : any;

  ngOnInit(): void {
    const api = new CallAPI(this.router);
    api.callAPI({ url:environment.userInfo}).then((data) => {
      if(data.status === 200) {
        this.user = data.response;
        console.log(data.response);
      }             
    });
  }

  Update(){

    console.log(this.user);
    const api = new CallAPI(this.router);
    api.callAPI({ url:environment.updateUser, method: "PUT", body: {user: this.user}}).then((data) => {
      if(data.status === 200) {
        window.location.reload();
        Swal.fire(
          "Se guardaron todos los cambios"
        )
      } else {
        Swal.fire(
          "Ocurrió un problema inesperado, intente nuevamente"
        )
      }
    });
  }

  addPlate(){
    var input = document.getElementById('plate') as HTMLInputElement | null;
    var value = input?.value;
    
    if (value && this.user.plates.indexOf(value) == -1){
      this.user.plates.push(value);
      if (input)
        input.value ="";
    }
  }

  removePlate(plate : string){
    const index = this.user.plates.indexOf(plate);
    if (index > -1) {
      this.user.plates.splice(index, 1);
    }
  }


  addTime(){

    var e1 = document.getElementById('day') as HTMLInputElement | null;
    var day = e1?.value;

    var e2 = document.getElementById('start') as HTMLInputElement | null;
    var start = e2?.value;

    var e2 = document.getElementById('end') as HTMLInputElement | null;
    var end = e2?.value;

    if (day && start && end){

      const time = {"start" : start, "end" : end};

      if (!this.user.schedule[day]){
        this.user.schedule[day] = []; 
      }
      this.user.schedule[day].push(time);
    }
  }


  removeTime(day : string, time : any){

    console.log(day, time);

    for (var i in this.user.schedule[day]){
      if (this.user.schedule[day][i]["start"] == time.start && this.user.schedule[day][i]["end"] == time.end){
        this.user.schedule[day].splice(i, 1);
      }
    }
  }

}
