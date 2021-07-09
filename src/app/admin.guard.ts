import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import { UsuariosService } from './services/usuarios.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
		private authService:UsuariosService,
		private router:Router
	){}

	canActivate(){
		if(localStorage.rol){
      //if(localStorage.rol=='1'){
      if(localStorage.rol=='1'){
        console.log('Soy admin');
        return true;
      }
      console.log('Soy user');
      // MENSAJE ALARMA EN DISPLAY:
      setTimeout(function () { alert("Usted no es administrador!"); }, 400);
      this.router.navigate(['usuarios/home']);
      return false;
		}
		this.router.navigate(['usuarios/ingresar']);
		return false;
	}
}