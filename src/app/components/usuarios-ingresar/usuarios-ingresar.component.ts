import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {Router} from '@angular/router'

// LINK CODE HTML: https://bootsnipp.com/snippets/PDPDr

@Component({
  selector: 'app-usuarios-ingresar',
  templateUrl: './usuarios-ingresar.component.html',
  styleUrls: ['./usuarios-ingresar.component.css']
  
})
export class UsuariosIngresarComponent implements OnInit {

  reintentar:boolean=false;
  mensaje:string="";
  registrar:boolean=false;
  loginFlag:boolean=false;
  user={  usuario:"", password:""};
  use={
    nombres:"",
    apellidos:"",
    dni:"",
    mail:"",
    rol:"",
    password:""
  };
  filterPost = "";

  errorUsuario=0;
  errorNombre=0;
  errorApellido=0;
  errorDNI=0;
  errorEmail=0;
  errorRol=0;
  alert:boolean=false;
  constructor(private usuariosService: UsuariosService,private router:Router) {

   }

  ngOnInit(): void {   
    this.registrar=false;
    if (localStorage.getItem("token") === null) {
      console.log(localStorage.rol);
      switch(localStorage.rol){  
          case "1": 
          console.log('Entre al caso 1');
          this.router.navigate(['admin/home']);
          break; //Aca va la ruta del admin pero como por ahora no existe .. 
          case "2": 
          console.log("entre al caso2")
          this.router.navigate(['usuarios/home']);
          break;        
        }
    }
  
  }

  ingresar(){
    this.loginFlag = true;
    this.usuariosService.ingresar(this.user).subscribe(
      res => {
        let result:any=res;
        console.log(result);
        localStorage.setItem('token',result.token);
        if(result.rol != undefined){
          localStorage.setItem('rol',result.rol);
          var nombreApellido = result.nombre + " "+ result.apellido;
          localStorage.setItem('nombreApellido', nombreApellido);
          this.usuariosService.logued$.emit();
          switch(result.rol)
          {
            case 1: 
            console.log('Entre al caso 1');
            localStorage.setItem('rolValidator', result.validarRol)
            this.router.navigate(['admin/home']);
            break; //Aca va la ruta del admin pero como por ahora no existe .. 
            case 2:
              console.log("Usuario"); 
            this.router.navigate(['usuarios/home']);
            break;        
          }
  
        }else{

          this.router.navigate(['usuarios/registrar']);

        }
       
        
      },
      err => {
        console.log(err.error.message);
        this.reintentar=true;
        this.mensaje=err.error.message;
        
      }
    )
	}

  recargarForm(){
    this.reintentar=false;
    this.user.usuario="";
    this.user.password="";
	  this.mensaje="";
    this.loginFlag=false;
  }

  
  
  registrarFlag()
  {
    this.registrar=true;
  }


}
