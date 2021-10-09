import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-usuarios-registrar',
  templateUrl: './usuarios-registrar.component.html',
  styleUrls: ['./usuarios-registrar.component.css']
})
export class UsuariosRegistrarComponent implements OnInit {



  mensaje:string="";
  user={
    nombres:"",
    apellidos:"",
    dni:"",
    mail:"",
    rol:2,
  };

  errorUsuario=0;
  errorNombre=0;
  errorApellido=0;
  errorDNI=0;
  errorEmail=0;
  errorRol=0;

  constructor(private usuariosService: UsuariosService,private router:Router) {
   }
  ngOnInit(): void {
    this.user.dni = localStorage.dni;
    console.log(this.user);
    if(this.user.dni == undefined || localStorage.rol!= undefined ){
      this.router.navigate(["/"]);
    }
  }

  registrar(){

		console.log("Sign Up");
    this.usuariosService.registrar(this.user).subscribe(
      res => {
        let result:any=res;
        this.mensaje=result.message;
        console.log(result.message);
        alert("Se agrego correctamente, debe esperar la activación se le mandara un mail cuando esto pase.")
        this.router.navigate(["/"]);
        
      },
      err => {
        console.log(err.error.message);
        this.mensaje=err.error.message;
      }
    )

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

  verificarForm():boolean{
    this.errorNombre=this.verificarNombre(this.user.nombres);
    this.errorApellido=this.verificarApellido(this.user.apellidos);
    this.errorDNI=this.verificarDNI(this.user.dni);
    this.errorEmail=this.verificarEmail(this.user.mail);
    if(  (this.errorNombre+this.errorUsuario+this.errorApellido+this.errorDNI+this.errorEmail+this.errorRol)>0){
      return false;
    }
    return true;
  }

  limpiarNombre() {
    if (this.errorNombre > 0) {
      this.user.nombres = "";
      this.errorNombre = 0;
    }
  }
  limpiarApellido() {
    if (this.errorApellido > 0) {
      this.user.apellidos = "";
      this.errorApellido = 0;
    }
  }
  limpiarDNI() {
    if (this.errorDNI > 0) {
      this.user.dni = "";
      this.errorDNI = 0;
    }
  }
  limpiarEmail() {
    if (this.errorEmail > 0) {
      this.user.mail = "";
      this.errorEmail = 0;
    }
  }



}
