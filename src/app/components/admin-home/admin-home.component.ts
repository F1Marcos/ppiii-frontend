import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  rol: string = "";
  usuario: string = "";

  constructor(private usuariosService:UsuariosService,private router:Router) { }

  ngOnInit(): void {
    this.usuariosService.verificarRol().subscribe(
			res => { 
        console.log("ROL OK");
        this.rol = localStorage.rol;
        this.usuario = localStorage.nombreApellido;
      },
      err => {
        console.log(err.error.message);
        console.log("LOCALSTORAGE MODIFICADO, SESION FINALIZADA");
        setTimeout(function () { alert("Sesion finalizada!"); }, 400);
        this.usuariosService.logOut();

        
      }
		) 
  
  }
  logOut(){
    this.usuariosService.logOut();
  }

}
