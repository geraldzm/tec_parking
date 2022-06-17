import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ReserveLeadershipComponent } from './reserve-leadership/reserve-leadership.component';
import { PayrollComponent } from './payroll/payroll.component';
import { DataTablesModule } from "angular-datatables";
import { StatsFranjaComponent } from './stats-franja/stats-franja.component';
import { StatsEstacionamientosComponent } from './stats-estacionamientos/stats-estacionamientos.component';
import { StatsFuncionariosComponent } from './stats-funcionarios/stats-funcionarios.component';
import { HttpClientModule } from '@angular/common/http';
import { StatsCrearEstacionamientoComponent } from './stats-crear-estacionamiento/stats-crear-estacionamiento.component';
import { PayrollEstacionamientosComponent } from './payroll-estacionamientos/payroll-estacionamientos.component';
import { PayrollFuncionariosComponent } from './payroll-funcionarios/payroll-funcionarios.component';
import { PayrollCrearFuncionarioComponent } from './payroll-crear-funcionario/payroll-crear-funcionario.component';
import { PayrollEditarFuncionarioComponent } from './payroll-editar-funcionario/payroll-editar-funcionario.component';
import { StatsEditarEstacionamientoComponent } from './stats-editar-estacionamiento/stats-editar-estacionamiento.component';
import { PerfilComponent } from './perfil/perfil.component';
import { StatsFuncionarioDetalleComponent } from './stats-funcionario-detalle/stats-funcionario-detalle.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StatsComponent,
    ReserveComponent,
    ReserveLeadershipComponent,
    PayrollComponent,
    StatsFranjaComponent,
    StatsEstacionamientosComponent,
    StatsFuncionariosComponent,
    StatsCrearEstacionamientoComponent,
    PayrollEstacionamientosComponent,
    PayrollFuncionariosComponent,
    PayrollCrearFuncionarioComponent,
    PayrollEditarFuncionarioComponent,
    StatsEditarEstacionamientoComponent,
    PerfilComponent,
    StatsFuncionarioDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
