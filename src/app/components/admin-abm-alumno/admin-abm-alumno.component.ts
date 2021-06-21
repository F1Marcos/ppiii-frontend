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
    rol:""
  };
  errorNombre=0;
  errorPrecio=0;
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
}
