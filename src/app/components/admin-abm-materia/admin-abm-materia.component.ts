import { Component, OnInit, OnChanges,SimpleChanges, Input, SimpleChange } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MateriasFilterPipe } from 'src/app/pipes/materias-filter.pipe';
import { UsuariosService } from '../../services/usuarios.service';
declare var jQuery:any
declare var $:any

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
  mensaje="";
  filterPost= "";
  errorID=0;
  errorNombre=0;
  errorAnio=0;
  errorTipo=0;
  alert:boolean=false;
  flagCorre:boolean=false;
  flagMaterias:boolean=false;
  asignadas: any=[];
  noAsignadas:any=[];
  matSeleccionada="";
  matSeleccionadaNombre="";
  pageCantidad:number=0;
  page: number = 0;
  elementos:number=1;
  seleccion:boolean=false; 


  CargarModificar(materia:any){
  
    this.mat={
      idMat:materia.idMat,
      nombreMat:materia.nombreMat,
      anio:materia.anio,
      tipo:materia.tipo,
      flagCorre:materia.flagCorre
    }
    this.seleccion=true;
    console.log(materia);
    console.log(this.mat);

  }

  ModAgr(){
   
    console.log("Entre a ModAgr");
    if(this.seleccion){
      this.modificarMateria();
    }else{
      this.agregarMateria()

    }
    $(function cerrar() {
      console.log("Entro a modal")
    $('.modal').modal('toggle');
    });
   
  }

  Paginado() {
    var aux = []
    for(var i =0; i<this.materias.length;i++){
      if(this.materias[i].nombreMat.toString().includes(this.filterPost))
      aux.push(this.materias[i])
    }
    this.pageCantidad = Math.trunc((aux.length)/10);
    if(aux.length %10 == 0 && this.pageCantidad!=0)
            this.pageCantidad--;

    this.elementos= aux.length;
    
    if(this.page+10 > aux.length){
      this.page = 0;
    }
  }

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
            this.pageCantidad=Math.trunc(this.materias.length/10);
            console.log(this.pageCantidad);
            console.log(this.pageCantidad%10);
            console.log("cantidad");
            if(this.materias.length %10 == 0 && this.pageCantidad!=0)
            this.pageCantidad--;
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

  SiguientePagina(){
    console.log(this.materias.length)
    console.log(this.page)
    var aux = []
    for(var i =0; i<this.materias.length;i++){
      if(this.materias[i].nombreMat.toString().includes(this.filterPost))
      aux.push(this.materias[i])
      
    }
    
    if(this.page+10 < aux.length){
      this.page += 10;
    }

  }
  AnteriorPagina(){
    if(this.page>0){
      this.page-=10
    }
  }

  cerrarForm(){
    setTimeout(()=>{ 
    console.log("Entre a cerrar");
    this.limpiarTodo()
    this.seleccion=false;
  }, 1000);
  }

  modificarMateria(){
    this.usuariosService.modificarMateria(this.mat).subscribe(
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
    this.usuariosService.agregarCorrelativa(this.asignadas,this.matSeleccionada).subscribe(
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

  mostrarMaterias(){

    this.flagMaterias=false;

  }

  mostrarCorr(){
    this.flagMaterias=true;
   
  }

  traerCorrelativas(mat:any){
    
    this.usuariosService.traerCorrelativas(mat).subscribe(
			res => {
			  let result:any=res;
        this.matSeleccionada=mat.idMat;
        this.matSeleccionadaNombre=mat.nombreMat;
			  console.log('RESPUESTA DEL BACKEN STATUS:');
			  console.log(result);
        this.asignadas=result.asignadas;
        this.noAsignadas=result.noAsignadas;
        this.flagCorre=true;


			},
			err => {
        this.alert=true;
        this.mensaje="No se pudo agregar la materia";
			  console.log(err.error);}
		  );

  }

  cancelar(){
    delete this.noAsignadas;
    delete this.asignadas;
    this.matSeleccionada="";
    this.matSeleccionadaNombre="";
    this.flagCorre=false;
  }
  asignar(mat:any){
    var aux:any= [];
    this.noAsignadas.forEach((element:any,index:number)=>{
      if(element.idMat==mat.idMat){
        delete this.noAsignadas[index];
      } else{
        aux.push(this.noAsignadas[index]);
      }
   });
   this.noAsignadas= aux;
   this.asignadas.push(mat);

  }
  noAsignar(mat:any){
    var aux:any= [];
    this.asignadas.forEach((element:any,index:number)=>{
      if(element.idMat==mat.idMat){
        delete this.asignadas[index];
      } else{
        aux.push(this.asignadas[index]);
      }
   });
   this.asignadas= aux;
   this.noAsignadas.push(mat);
  }

  enviarAsign(){
    
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

  logOut(){
    this.usuariosService.logOut();
  }

 

}

