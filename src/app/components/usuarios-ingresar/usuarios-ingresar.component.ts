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
        localStorage.setItem('dni', result.dni);

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

  
  verificarForm():boolean{
    this.errorNombre=this.verificarNombre(this.use.nombres);
    this.errorApellido=this.verificarApellido(this.use.apellidos);
    this.errorDNI=this.verificarDNI(this.use.dni);
    this.errorEmail=this.verificarEmail(this.use.mail);
    this.errorRol=this.verificarRol(this.use.rol);
    if(  (this.errorNombre+this.errorUsuario+this.errorApellido+this.errorDNI+this.errorEmail+this.errorRol)>0){
      return false;
    }
    return true;
  }

  verificarUsuario(nombre:string):number {
    const patron=/^[a-zA-Z0-9]+$/;
    if(nombre.length==0)
      return 1;
    if(nombre.length>20)
      return 2;
    if(!patron.test(nombre))
      return 3;
    return 0;
  }
  verificarNombre(nombre:string):number {
    const patron=/^\b(?!.*?\s{2})[A-Za-z ]{1,20}\b$/;
    console.log(nombre);
    if(nombre.length==0)
      return 1;
    if(nombre.length>20)
      return 2;
    if(!  patron.test(nombre))
      return 3;
    return 0;
  }
  verificarApellido(apellido:string):number {
    const patron=/^\b(?!.*?\s{2})[A-Za-z ]{1,30}\b$/;
    if(apellido.length==0)
      return 1;
    if(apellido.length>20)
      return 2;
    if(!patron.test(apellido))
      return 3;
    return 0;
  }
  verificarDNI(dni:string):number {
    console.log(dni);
    const patron=/^[0-9]*$/;
    if(dni.length==0)
      return 1;
    if(dni.length>12)
      return 2;
    if(!patron.test(dni))
      return 3;
    return 0;
  }
  verificarEmail(mail:string):number {
    const patron=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if(mail.length==0)
      return 1;
    if(mail.length>60)
      return 2;
    if(!patron.test(mail))
      return 3;
    return 0;
  }
    verificarRol(rol:string):number {
    const patron=/^[1-2]*$/;
    if(rol.length==0)
      return 1;
    if(rol.length>1)
      return 2;
     if(!patron.test(rol))
      return 2;
    return 0;
  }

  limpiarNombre() {
    if (this.errorNombre > 0) {
      this.use.nombres = "";
      this.errorNombre = 0;
    }
  }
  limpiarApellido() {
    if (this.errorApellido > 0) {
      this.use.apellidos = "";
      this.errorApellido = 0;
    }
  }
  limpiarDNI() {
    if (this.errorDNI > 0) {
      this.use.dni = "";
      this.errorDNI = 0;
    }
  }
  limpiarEmail() {
    if (this.errorEmail > 0) {
      this.use.mail = "";
      this.errorEmail = 0;
    }
  }
  limpiarRol() {
    if (this.errorRol > 0) {
      this.use.rol = "";
      this.errorRol = 0;
    }
  }

  limpiarTodo(){
    this.use={
      nombres:"",
      apellidos:"",
      dni:"",
      mail:"",
      rol:"",
      password:""
    };
    this.errorUsuario=0;
    this.errorNombre=0;
    this.errorApellido=0;
    this.errorDNI=0;
    this.errorEmail=0;
    this.errorRol=0;
  }

  registrarFlag()
  {
    this.registrar=true;
  }


}
