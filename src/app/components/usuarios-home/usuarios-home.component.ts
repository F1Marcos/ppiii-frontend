import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-usuarios-home',
  templateUrl: './usuarios-home.component.html',
  styleUrls: ['./usuarios-home.component.css']
})
export class UsuariosHomeComponent implements OnInit {

  usuario = "";
  porcentaje:number = 0;

  constructor(private usuariosService:UsuariosService,private router:Router) { }

  ngOnInit(): void {
    this.usuariosService.barraProgreso(localStorage.dni).subscribe(
      res => {
      const result:any = res;
      this.porcentaje=result.porcentaje;
      console.log(res);
      },
      err => {
      }
    );
    this.usuario = localStorage.nombreApellido;
  }

}
