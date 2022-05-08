import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  async ngOnInit()  {
  }

  async Ingresar(){
        console.log(this.usuario);
        console.log(this.usuario.email);
        const{email,password} = this.usuario;
        this.router.navigate(['/home']);
  }
  

}
