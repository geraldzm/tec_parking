import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PayrollComponent } from './payroll/payroll.component';
import { StatsComponent } from './stats/stats.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ReserveLeadershipComponent } from './reserve-leadership/reserve-leadership.component';
import { ReserveOfficialVehicleComponent } from './reserve-officialvehicle/reserve-officialvehicle.component';
import { ReserveVisitorComponent } from './reserve-visitor/reserve-visitor.component';
import { StatsFranjaComponent } from './stats-franja/stats-franja.component';
import { StatsEstacionamientosComponent } from './stats-estacionamientos/stats-estacionamientos.component';
import { StatsFuncionariosComponent } from './stats-funcionarios/stats-funcionarios.component';
import { StatsCrearEstacionamientoComponent } from './stats-crear-estacionamiento/stats-crear-estacionamiento.component';
import { StatsEditarEstacionamientoComponent } from './stats-editar-estacionamiento/stats-editar-estacionamiento.component';
import { StatsFuncionarioDetalleComponent } from './stats-funcionario-detalle/stats-funcionario-detalle.component';
import { PayrollEstacionamientosComponent } from './payroll-estacionamientos/payroll-estacionamientos.component';
import { PayrollFuncionariosComponent } from './payroll-funcionarios/payroll-funcionarios.component';
import { PayrollCrearFuncionarioComponent } from './payroll-crear-funcionario/payroll-crear-funcionario.component';
import { PayrollEditarFuncionarioComponent } from './payroll-editar-funcionario/payroll-editar-funcionario.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
{path:'',redirectTo:'login', pathMatch: 'full' },
{path: 'login', component: LoginComponent, pathMatch: 'full'},
{path: 'home', component: HomeComponent, pathMatch: 'full'},
{path: 'payroll', component: PayrollComponent, pathMatch: 'full'},
{path: 'reserve', component: ReserveComponent, pathMatch: 'full'},
{path: 'reserveleadership', component: ReserveLeadershipComponent, pathMatch: 'full'},
{path: 'reservevisitor', component: ReserveVisitorComponent, pathMatch: 'full'},
{path: 'reserveofficialvehicle', component: ReserveOfficialVehicleComponent, pathMatch: 'full'},
{path: 'stats', component: StatsComponent, pathMatch: 'full'},
{path: 'statsFranja', component: StatsFranjaComponent, pathMatch: 'full'},
{path: 'statsEstacionamientos', component: StatsEstacionamientosComponent, pathMatch: 'full'},
{path: 'statsFuncionarios', component: StatsFuncionariosComponent, pathMatch: 'full'},
{path: 'statsCrearEstacionamientos', component: StatsCrearEstacionamientoComponent, pathMatch: 'full'},
{path: 'statsEditarEstacionamientos/:id', component: StatsEditarEstacionamientoComponent, pathMatch: 'full'},
{path: 'statsFuncionarioDetalle/:id', component: StatsFuncionarioDetalleComponent, pathMatch: 'full'},
{path: 'payrollEstacionamientos', component: PayrollEstacionamientosComponent, pathMatch: 'full'},
{path: 'payrollFuncionarios', component: PayrollFuncionariosComponent, pathMatch: 'full'},
{path: 'payrollCrearFuncionario', component: PayrollCrearFuncionarioComponent, pathMatch: 'full'},
{path: 'payrollEditarFuncionario/:id', component: PayrollEditarFuncionarioComponent, pathMatch: 'full'},
{path: 'perfil', component: PerfilComponent, pathMatch: 'full'},
];


export const app_routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
