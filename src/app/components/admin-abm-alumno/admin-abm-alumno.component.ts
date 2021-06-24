import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-admin-abm-alumno',
  templateUrl: './admin-abm-alumno.component.html',
  styleUrls: ['./admin-abm-alumno.component.css']
})
export class AdminAbmAlumnoComponent implements OnInit {

  constructor(private usuariosService:UsuariosService) { }

  usuarios: any = [];
  use={
    usuario:"", 
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


  ngOnInit(): void {
    this.usuariosService.listarUsuarios().subscribe(
      res => {
        console.log(res);
        this.usuarios=res;
        console.log(this.usuarios);
        // this.router.navigate(['admin/abm']);
      },
      err => {
        console.log(err.error.message);
        // this.reintentar=true;
        // this.mensaje=err.error.message;      
      }
    );
  }

  modificarUsuario(user:any){
    this.usuariosService.modificarUsuario(user).subscribe(
			res => {
			  let result:any=res;
			  console.log('RESPUESTA DEL BACKEN STATUS:');
			  console.log(result);
        this.ngOnInit();
			  // this.router.navigate(['usuarios/listar']);
			},
			err => {
			  console.log(err.error);}
		  );
  }

  eliminarUsuario(user:any){
    console.log('FE: Entre metod post eliminar usuario!');
    console.log(user);
    if(confirm("Esta seguro que desea eliminar al usuario "+user.usuario)) {
      console.log("Implement delete functionality here");
    
    this.usuariosService.eliminarUsuario(user.id).subscribe(
      res => {
        let result:any=res;
        console.log(result.message);
        console.log(result);
        this.ngOnInit();
        // this.router.navigate(['admin/abm']);
      },
      err => {
        console.log(err.error.message);
        // this.reintentar=true;
        // this.mensaje=err.error.message;      
      }
    );
    }
  }

  agregarAlumno(){
    
    this.usuariosService.agregarUsuario(this.use).subscribe(
			res => {
			  let result:any=res;
			  console.log('RESPUESTA DEL BACKEN STATUS:');
			  console.log(result);
        this.ngOnInit();
			  // this.router.navigate(['usuarios/listar']);
			},
			err => {
			  console.log(err.error);}
		  );
  }

  verificarForm():boolean{
    this.errorUsuario=this.verificarUsuario(this.use.usuario);
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
    if(mail.length>50)
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

  limpiarUsuario() {
    if (this.errorUsuario > 0) {
      this.use.usuario = "";
      this.errorUsuario = 0;
    }
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
      usuario:"", 
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

}
