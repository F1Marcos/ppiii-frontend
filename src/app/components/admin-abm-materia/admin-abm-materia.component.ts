import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-admin-abm-materia',
  templateUrl: './admin-abm-materia.component.html',
  styleUrls: ['./admin-abm-materia.component.css']
})
export class AdminAbmMateriaComponent implements OnInit {

  constructor(private usuariosService:UsuariosService) { }
  materias: any = [];
  mat: any = [];

  // mat={   // Utilizado para agregar!
  //   usuario:"", 
  //   nombres:"",
  //   apellidos:"",
  //   dni:"",
  //   mail:"",
  //   rol:""
  // };

  errorNombre=0;
  errorPrecio=0;
  alert:boolean=false;

  ngOnInit(): void {
    this.usuariosService.listarMaterias().subscribe(
      res => {
        console.log(res);
        this.materias=res;
        console.log(this.materias);
      },
      err => {
        console.log(err.error.message);    
      }
    );
  }

  modificarMateria(mat:any){
    this.usuariosService.modificarMateria(mat).subscribe(
			res => {
			  let result:any=res;
			  console.log('RESPUESTA DEL BACKEN STATUS:');
			  console.log(result);
        this.ngOnInit();
			},
			err => {
			  console.log(err.error);}
		  );
  }

  eliminarMateria(mat:any){
    console.log('FE: Entre metod post eliminar materia!');
    console.log(mat);
    if(confirm("Esta seguro que desea eliminar al materia "+mat.nombreMat)) {
      console.log("Implement delete functionality here");
    
    this.usuariosService.eliminarMateria(mat.idMat).subscribe(
      res => {
        let result:any=res;
        console.log(result.message);
        console.log(result);
        this.ngOnInit();
      },
      err => {
        console.log(err.error.message);     
      }
    );
    }
  }

  agregarMateria(){
    this.usuariosService.agregarMateria(this.mat).subscribe(
			res => {
			  let result:any=res;
			  console.log('RESPUESTA DEL BACKEN STATUS:');
			  console.log(result);
        this.ngOnInit();
			},
			err => {
			  console.log(err.error);}
		  );
  }
}
