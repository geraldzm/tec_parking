import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { callAPI, saveToken } from '../utils/api'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Aqui se guardan los credenciales que se digitan
  usuario = {
    email: '',
    password: ''
  }

  constructor(private router: Router) { }

  async ngOnInit()  {}

  async Ingresar(){
    console.log(this.usuario);

    const data = await callAPI({ url:environment.login, method: "POST", body: this.usuario, withAuth:false});

    if(data.status === 200) {
      console.log("data: " + JSON.stringify(data))
      saveToken(data.response.token);
      this.router.navigate(['/home']);
      return;
    } 
    
    console.log("wrong password or email");
  }
  

}
