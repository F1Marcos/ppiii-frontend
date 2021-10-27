import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css']
  
})
export class UsuariosListarComponent implements OnInit {

  constructor(private usuariosService:UsuariosService){	}
  usuarios:any = [];
  revelar:boolean=false;

  ngOnInit(){
    
		this.usuariosService.listarUsuarios().subscribe(
			res => { 
        this.usuarios = res; 
        console.log(res)
      },
      err => {
        this.usuariosService.logOut();
      }		)
	}

  

}
