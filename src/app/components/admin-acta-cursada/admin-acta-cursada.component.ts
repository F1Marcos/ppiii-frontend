import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'ts-xlsx';
import { DatePipe } from '@angular/common'
import { EMPTY } from 'rxjs';


@Component({
  selector: 'app-admin-acta-cursada',
  templateUrl: './admin-acta-cursada.component.html',
  styleUrls: ['./admin-acta-cursada.component.css']
})
export class AdminActaCursadaComponent implements OnInit {

  acta = {
    nroActa:"",
    idMat: "",
    curso: "",
    cuatrimestre:"",
    fecha:"",
    tipo:""
  }
  aux:any=[];
  actasListCursada: any = [];
  actasListFinal: any =[];
  load: any;
  arrayBuffer:any;
  file: any;
  errorActa:boolean=false;
  mensaje:string="";
  alert:boolean=false;
  pageCantidad:number=0;
  page: number = 0;
  elementos:number=1;
  filterPost= "";
  
  
  // archivosseleccionado: any;
  notasTotales:any=[];

  //DROPZONE:
  files: File[] = [];

  //switch mostrar actas:
  flag_cursada:boolean=true;
  flag_final:boolean=false;

  constructor(private usuariosService: UsuariosService, private http: HttpClient, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.usuariosService.verificarRol().subscribe(
			res => { 
        setTimeout(()=>{                           
          this.alert = false;
          this.mensaje="";
     }, 3000);
        this.acta = {
          nroActa:"",
          idMat: "",
          curso: "",
          cuatrimestre:"",
          fecha:"",
          tipo:""
        };
        delete this.file;
        delete this.arrayBuffer;
        delete this.notasTotales;
        delete this.aux;
        this.usuariosService.listarActasCursadas().subscribe(
          res => { 
            var result:any = res;
            console.log('ACA RECIBO LISTA DE ACTAS');
            console.log(res);
            this.actasListCursada = result.cursada;
            this.actasListFinal = result.final;
            this.pageCantidad=Math.trunc(this.actasListCursada.length/10);
            console.log(this.pageCantidad);
            console.log(this.pageCantidad%10);
            console.log("cantidad");
            if(this.actasListCursada.length %10 == 0 && this.pageCantidad!=0)
            this.pageCantidad--;
          },
          err => {
            console.log(err.error.message);
          }
        )
      },
      err => {
        console.log(err.error.message);
        console.log("LOCALSTORAGE MODIFICADO, SESION FINALIZADA");
        setTimeout(function () { alert("Sesion finalizada!"); }, 400);
        this.usuariosService.logOut();
      }
		)
  
  }

//DROPZONE:

//Remover
onRemove() {
  delete this.file;
  console.log(this.file);
  
}
  //Cargo el file
  parcearCSV(event:any): void {

    if (event.addedFiles && event.addedFiles[0]) {
      this.file = <File>event.addedFiles[0];
      
    }
  
  }
  
//Parceo el file antes de mandar
  cargaFile(){
    let fileReader = new FileReader();
      this.notasTotales = [];
      fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          //console.log(data);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
          var aux:any;
          aux = XLSX.utils.sheet_to_json(worksheet,{raw:true});
          console.log(aux);
          console.log("IMPRIMO AUX");
          //Convierto la fecha
            console.log(aux[12]);
            var objetos = [];
            for(let i=0;i<aux.length ;i++){
              var valor:any;
              valor = Object.values(aux[i]).toString();
              valor =valor.replace(/[,]/g,"");
              objetos= valor.split(";");
              if(/^([0-9])/.test(valor)){

                switch(this.acta.tipo){

                  case "cursada":
                  var notas={
                    idacta:"",
                    Udni: "",
                    nota1:"",
                    nota2:"",
                    nota3:"",
                    nota4:"",
                    notaFinalNum:"",
                    notaFinalLet:"",
                    estado:""
                  }
                  objetos= valor.split(";");
                  console.log("IMPRIMO OBJETOS");
                  console.log(objetos);
                  objetos[2]= objetos[2].replace(/[.]/g,"");
                  notas.Udni= objetos[2];
                  notas.nota1= objetos[3];
                  notas.nota2= objetos[4];
                  notas.nota3=objetos[5];
                  notas.nota4=objetos[6];
                  notas.notaFinalNum=objetos[7];
                  notas.notaFinalLet= objetos[8];
                  notas.estado=objetos[9];
                  console.log("IMPRIMO NOTAS");
                  console.log(notas);
                 
                  if(notas.Udni!="")
                  {
                    console.log("ENTRE A CARGAR LA NOTA")
                    console.log(aux);
                    console.log(notas.Udni);
                    this.notasTotales.push(notas);
                   // this.aux.push(notas.Udni);
                  }else{
                    console.log("entro al error");
                    this.errorActa=true;
                    return
                  }
                  
                  break;
                  case "final":
                    var notasFinal={
                      idacta:"",
                      Udni: "",
                      nota:"",
                      notaLetra:"",
                    }
                  objetos[2]= objetos[2].replace(/[.]/g,"");
                  notasFinal.Udni= objetos[2];
                  notasFinal.nota= objetos[3];
                  notasFinal.notaLetra= objetos[4];
                  if(notasFinal.Udni!=""){
                    this.notasTotales.push(notasFinal);
                  }
                  break;
                  default: console.log("No hago nada");
                  break;
                }
                
              
              }else{
                
                valor =valor.replace(/[;]/g,"");
               

                if(valor.match("Código Materia:")){
                    valor = valor.replace("Código Materia:","");
                    valor =valor.replace(/[ ]/g,"");
                    this.acta.idMat=valor;
                }

                if(valor.match("Codigo Materia:")){
                  valor = valor.replace("Codigo Materia:","");
                  valor =valor.replace(/[ ]/g,"");
                  this.acta.idMat=valor;
              }
              /*
                if(valor.match("Fecha")){
                  console.log("IMPRIMO FECHA");
                  console.log(valor);
                  valor = valor.replace("Fecha:","");
                  var fecha = valor.split("|");
                  console.log("AAAAAAAAAAAAAAAAAAAA");            
                  valor = fecha[2]+"-"+fecha[1]+"-"+fecha[0];
                  this.acta.fecha=valor;
                  console.log(this.acta.fecha);
                }
                */

                console.log(valor);
                if(valor.match("Fecha:")){
                  valor =valor.replace(/[ ]/g,"");
                  valor = valor.replace("Fecha:","");
                  var fecha = valor.split("/");
                  console.log(fecha);
                  valor = fecha[2]+"-"+fecha[1]+"-"+fecha[0];
                  this.acta.fecha=valor;
                  console.log(valor);
                }
                if(valor.match("Numero acta de cursada:")){
                  valor = valor.replace("Numero acta de cursada:","");
                  valor =valor.replace(/[ ]/g,"");
                  this.acta.nroActa=valor;

                }
                if(valor.match("Número acta de final:")){
                  valor = valor.replace("Número acta de final:","");
                  valor =valor.replace(/[ ]/g,"");
                  this.acta.nroActa=valor;

                }
                
                if(valor.match("Acta de Final")){
                  this.acta.tipo="final";
                }
                if(valor.match("Acta de Cursada")){
                this.acta.tipo="cursada";
                }
                if(valor.match("Curso:")){
                  valor =valor.replace(/[ ]/g,"");
                  valor = valor.replace("Curso:","");
                  this.acta.curso =valor;
                  console.log(valor);
              }
              if(valor.match("Cuatrimestre:")){
                valor =valor.replace(/[ ]/g,"");
                valor = valor.replace("Cuatrimestre:","");
                if(valor.startsWith("1")){
                  this.acta.cuatrimestre= "Primero";
                }
                if(valor.startsWith("2")){
                  this.acta.cuatrimestre= "Segundo";
                }
                if(valor.startsWith("A")){
                  this.acta.cuatrimestre= "Anual";
                }
                console.log(valor);
          }
        }            
      }
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  eliminarActa(actaSelect:any){
    if(confirm("¿Esta seguro que desea eliminar al acta? sAl eliminar el acta se borraran todas las notas vinculadas a la misma")) {
    this.usuariosService.eliminarActa(actaSelect.nroActa,actaSelect.tipo).subscribe(
      res => {
        this.alert=true;
        this.mensaje="Se elimino el acta correctamente";
        this.load=false
        this.ngOnInit();
      },
      err => {        
        this.alert=true;
        this.mensaje="No se pudo eliminar el acta, vuelva a intentar mas tarde";
        console.log("ERROR");
        console.log(err);
        this.load=false
      }
    )
    }

  }
/*modificarActa(actaSelect:any){
  this.usuariosService.modificarActa(actaSelect).subscribe(
    res => {
      console.log("Se guardaron las notas");
      this.alert=true;
      this.mensaje="Se modifico el acta de correctamente";
      this.load=false
      this.ngOnInit();
    },
    err => {        
      console.log("ERROR");
      console.log(err);
      this.load=false
    }
  )
    
  }*/
  async onSubmit() {  
    this.load=true;
    this.cargaFile();
    setTimeout(()=>{   
     console.log("IMPRIMO EN SUBMIT");                        
    console.log(this.acta);
    console.log(this.notasTotales);
    
    if((this.flag_cursada==true && this.acta.tipo=="cursada")||(this.flag_final==true && this.acta.tipo=="final")){
      if(!this.errorActa){

    this.usuariosService.crearActa(this.acta).subscribe(  
      res => {
        const result:any = res;
        for(var i =0; i < this.notasTotales.length;i++){
          this.notasTotales[i].idacta =  result.id;
        }
        this.usuariosService.agregarNotas(this.notasTotales,this.acta.tipo).subscribe(
          res => {
            this.alert=true;
            this.mensaje="Se creo el acta correctamente";
            this.load=false
            this.ngOnInit();
          },
          err => {        
            console.log("ERROR");
            console.log(err);
            this.load=false
          }
        )
      },
      err =>{
        console.log("ERROR");
        this.load=false
      }
    )
  }else{
    this.load=false;
    console.log("NO SE CARGO BIEN EL ACTA");
  }
  }else{
    console.log("TIPO INCORRECTO");
    this.load=false;
  }
  }, 3000);


  }
  
  actaCursada(){
    this.flag_cursada=true;
    this.flag_final=false;
    this.pageCantidad=Math.trunc(this.actasListCursada.length/10);
    if(this.actasListCursada.length %10 == 0 && this.pageCantidad!=0)
    this.pageCantidad--;
  }

  actaFinal(){
    this.flag_final=true;
    this.flag_cursada=false;
    this.pageCantidad=Math.trunc(this.actasListFinal.length/10);
    if(this.actasListFinal.length %10 == 0 && this.pageCantidad!=0)
    this.pageCantidad--;
  }

  SiguientePagina(){
    const actas = this.TipoActa()
    console.log(actas.length)
    console.log(this.page)
    var aux = []
    for(var i =0; i< actas.length;i++){
      if(actas[i].nombreMat.toString().includes(this.filterPost))
      aux.push(actas[i])
      
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

  Paginado() {
    console.log("ENTRE A PAGINADO")
    var actas = this.TipoActa()
    console.log(actas);
    var aux = []
   
    for(var i =0; i<actas.length;i++){
      console.log("imprimo valores")
      console.log(actas[i].nombreMat);
      console.log(this.filterPost);
      if(actas[i].nombreMat.toUpperCase().includes(this.filterPost.toUpperCase()))
      {
        console.log("entro a if")
        aux.push(actas[i])
      }
      
    }
    console.log("imprimo aux");
    console.log(aux); 
    this.pageCantidad = Math.trunc((aux.length)/10);
    if(aux.length %10 == 0 && this.pageCantidad!=0)
    this.pageCantidad--;

    this.elementos= aux.length;
    
    if(this.page+10 > aux.length){
      this.page = 0;
    }
  
  }

    TipoActa(){
    var actas: any;
    if(this.flag_cursada)
    return this.actasListCursada;
    else
    return this.actasListFinal;
    
  }

  logOut(){
    this.usuariosService.logOut();
  }

}
