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
  mat={
    idMat:"", 
    nombreMat:"",
    anio:"",
    tipo:"",
    flagCorre:0
  };
  materia="";
  aprob="";
  mensaje="";
  filterPost="";
  errorID=0;
  errorNombre=0;
  errorAnio=0;
  errorTipo=0;
  alert:boolean=false;

  ngOnInit(): void {
    this.usuariosService.verificarRol().subscribe(
			res => { 
        setTimeout(()=>{                           
          this.alert = false;
          this.mensaje="";
     }, 3000);
        this.usuariosService.listarMaterias().subscribe(
          res => {
            console.log("RES DE SERVICE");
            console.log(res);
            this.materias=res;
            console.log(this.materias);
          },
          err => {
            console.log("ERR DE SERVICE");
            console.log(err.error.message);    
          }
        );
      },
      err => {
        console.log(err.error.message);
        console.log("LOCALSTORAGE MODIFICADO, SESION FINALIZADA");
        setTimeout(function () { alert("Sesion finalizada!"); }, 400);
        this.usuariosService.logOut();

        
      }
		)
    
  }

  modificarMateria(mat:any){
    this.usuariosService.modificarMateria(mat).subscribe(
			res => {
			  let result:any=res;
			  console.log('RESPUESTA DEL BACKEN STATUS:');
			  console.log(result);
        this.alert=true;
        this.mensaje="Se pudo modificar la materia";
        this.ngOnInit();
			},
			err => {
        this.alert=true;
        this.mensaje="No se pudo modificar la materia";
			  console.log(err.error);}
		  );
  }

  eliminarMateria(mat:any){
    console.log('FE: Entre metod post eliminar materia!');
    console.log(mat);
    if(confirm("Esta seguro que desea eliminar al materia "+mat.nombreMat+" esto puede causar problemas de haber registros en la BD")) {
    
    this.usuariosService.eliminarMateria(mat.idMat).subscribe(
      res => {
        let result:any=res;
        console.log(result.message);
        console.log(result);
        this.alert=true;
        this.mensaje="Se elimino la materia correctamente";
        this.ngOnInit();
      },
      err => {
        this.alert=true;
        this.mensaje="No se pudo eliminar la materia";
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
        this.alert=true;
        this.mensaje="Se pudo agrego la materia correctamente";
        this.limpiarTodo();
        this.ngOnInit();
			},
			err => {
        this.alert=true;
        this.mensaje="No se pudo agregar la materia";
			  console.log(err.error);}
		  );
  }

  agregarCorrelativa(){
    this.usuariosService.agregarCorrelativa(this.materia,this.aprob).subscribe(
			res => {
			  let result:any=res;
			  console.log('RESPUESTA DEL BACKEN STATUS:');
			  console.log(result);
        this.alert=true;
        this.mensaje="Se pudo agrego la correlativa correctamente";
        this.limpiarTodo();
        this.ngOnInit();
			},
			err => {
        this.alert=true;
        this.mensaje="No se pudo agregar la materia";
			  console.log(err.error);}
		  );
  }


  verificarForm():boolean{
    this.errorID=this.verificarID(this.mat.idMat);
    this.errorNombre=this.verificarNombre(this.mat.nombreMat);
    this.errorAnio=this.verificarAnio(this.mat.anio);
    this.errorTipo=this.verificarTipo(this.mat.tipo);
    if(  (this.errorNombre+this.errorID+this.errorAnio+this.errorTipo)>0){
      return false;
    }
    return true;
  }

  verificarID(id:string):number {
    const patron=/[1-9]/;
    if(id.length==0)
      return 1;
    if(id.length>6)
      return 2;
    if(!patron.test(id))
      return 3;
    return 0;
  }
  verificarNombre(nombre:string):number {
    const patron=/[A-Za-z0-9]/;
    console.log(nombre);
    if(nombre.length==0)
      return 1;
    if(nombre.length>20)
      return 2;
    if(! patron.test(nombre))
      return 3;
    return 0;
  }
  verificarAnio(anio:string):number {
    const patron=/^[1-3]*$/;
    if(anio.length==0)
      return 1;
    if(anio.length>20)
      return 2;
    if(!patron.test(anio))
      return 3;
    return 0;
  }
  verificarTipo(tipo:string):number {
    if(!(tipo=='Cuatrimestral'|| tipo=='Anual'))
      return 1;
    return 0;
  }
  limpiarID() {
    if (this.errorID > 0) {
      this.mat.idMat = "";
      this.errorID = 0;
    }
  }
  limpiarNombre() {
    if (this.errorNombre > 0) {
      this.mat.nombreMat = "";
      this.errorNombre = 0;
    }
  }
  limpiarAnio() {
    if (this.errorAnio > 0) {
      this.mat.anio = "";
      this.errorAnio = 0;
    }
  }
  limpiarTipo() {
    if (this.errorTipo > 0) {
      this.mat.tipo = "";
      this.errorTipo = 0;
    }
  }

  
  limpiarTodo(){
    this.mat={
      idMat:"", 
      nombreMat:"",
      anio:"",
      tipo:"",
      flagCorre:0
    };
  
    this.errorID=0;
    this.errorNombre=0;
    this.errorAnio=0;
    this.errorTipo=0;
  }
}

