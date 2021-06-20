import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsuariosListarComponent} from "./components/usuarios-listar/usuarios-listar.component"
import {UsuariosIngresarComponent} from "./components/usuarios-ingresar/usuarios-ingresar.component"
import {UsuariosRegistrarComponent} from "./components/usuarios-registrar/usuarios-registrar.component"
import { UsuariosPrincipalComponent } from "./components/usuarios-principal/usuarios-principal.component";
import { AlumnoListarAprobComponent } from "./components/alumno-listar-aprob/alumno-listar-aprob.component";
import { AlumnoListarCorreComponent } from "./components/alumno-listar-corre/alumno-listar-corre.component";
import { AdminAbmAlumnoComponent } from "./components/admin-abm-alumno/admin-abm-alumno.component";
import { UsuariosHomeComponent } from "./components/usuarios-home/usuarios-home.component";
import { WebTPComponent } from "./components/web-tp/web-tp.component";
import {AuthGuard} from './auth.guard';



const routes: Routes = [
	{	
		path: '',
		redirectTo: 'usuarios/ingresar',
		pathMatch: 'full'
	},
	{	
		path: 'usuarios/pizarra',
		component: WebTPComponent,
		
	},
	{	
		path: 'admin/abmAlumn',
		component: AdminAbmAlumnoComponent,
		canActivate: [AuthGuard]
		
	},
	{
		path: 'usuarios/listar',
		component: UsuariosListarComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'usuarios/ingresar',
		component: UsuariosIngresarComponent
	},
	{
		path: 'usuarios/registrar',
		component: UsuariosRegistrarComponent,
	},
	{
		path: 'usuarios/principal',
		component: UsuariosPrincipalComponent,
		canActivate: [AuthGuard]
	},
	{
		path:'usuarios/home',
		component: UsuariosHomeComponent,
		canActivate: [AuthGuard]
	},
	{
		path:'usuarios/listMaterias',
		component: AlumnoListarAprobComponent,
		canActivate: [AuthGuard]
		
	},
	{
		path:'usuarios/listCorre',
		component: AlumnoListarCorreComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
