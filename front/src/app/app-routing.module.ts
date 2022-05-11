import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PayrollComponent } from './payroll/payroll.component';
import { StatsComponent } from './stats/stats.component';
import { ReserveComponent } from './reserve/reserve.component';
import { StatsFranjaComponent } from './stats-franja/stats-franja.component';
import { StatsEstacionamientosComponent } from './stats-estacionamientos/stats-estacionamientos.component';
import { StatsFuncionariosComponent } from './stats-funcionarios/stats-funcionarios.component';
import { StatsCrearEstacionamientoComponent } from './stats-crear-estacionamiento/stats-crear-estacionamiento.component';
import { StatsEditarEstacionamientoComponent } from './stats-editar-estacionamiento/stats-editar-estacionamiento.component';
import { PayrollEstacionamientosComponent } from './payroll-estacionamientos/payroll-estacionamientos.component';
import { PayrollFuncionariosComponent } from './payroll-funcionarios/payroll-funcionarios.component';
import { PayrollCrearFuncionarioComponent } from './payroll-crear-funcionario/payroll-crear-funcionario.component';
import { PayrollEditarFuncionarioComponent } from './payroll-editar-funcionario/payroll-editar-funcionario.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
{path: 'login', component: LoginComponent, pathMatch: 'full'},
{path: 'home', component: HomeComponent, pathMatch: 'full'},
{path: 'payroll', component: PayrollComponent, pathMatch: 'full'},
{path: 'reserve', component: ReserveComponent, pathMatch: 'full'},
{path: 'stats', component: StatsComponent, pathMatch: 'full'},
{path: 'statsFranja', component: StatsFranjaComponent, pathMatch: 'full'},
{path: 'statsEstacionamientos', component: StatsEstacionamientosComponent, pathMatch: 'full'},
{path: 'statsFuncionarios', component: StatsFuncionariosComponent, pathMatch: 'full'},
{path: 'statsCrearEstacionamientos', component: StatsCrearEstacionamientoComponent, pathMatch: 'full'},
{path: 'statsEditarEstacionamientos', component: StatsEditarEstacionamientoComponent, pathMatch: 'full'},
{path: 'payrollEstacionamientos', component: PayrollEstacionamientosComponent, pathMatch: 'full'},
{path: 'payrollFuncionarios', component: PayrollFuncionariosComponent, pathMatch: 'full'},
{path: 'payrollCrearFuncionario', component: PayrollCrearFuncionarioComponent, pathMatch: 'full'},
{path: 'payrollEditarFuncionario', component: PayrollEditarFuncionarioComponent, pathMatch: 'full'},
{path: 'perfil', component: PerfilComponent, pathMatch: 'full'},
];

export const app_routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
