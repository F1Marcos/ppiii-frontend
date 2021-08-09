import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-admin-acta-cursada',
  templateUrl: './admin-acta-cursada.component.html',
  styleUrls: ['./admin-acta-cursada.component.css']
})
export class AdminActaCursadaComponent implements OnInit {

  acta = {
    idMat: "",
    curso: "",
    cuatrimestre:"",
    fecha:"",
    tipo:""
  }
  actasListCursada: any = [];
  actasListFinal: any =[];
  load: any;
  arrayBuffer:any;
  file: any;
  
  // archivosseleccionado: any;
  notasTotales:any=[];

  //DROPZONE:
  files: File[] = [];

  //switch mostrar actas:
  flag_cursada:boolean=false;
  flag_final:boolean=false;

  constructor(private usuariosService: UsuariosService, private http: HttpClient) { }

  ngOnInit(): void {
    this.usuariosService.verificarRol().subscribe(
			res => { 
        delete this.file;
        this.usuariosService.listarActasCursadas().subscribe(
          res => { 
            var result:any = res;
            console.log(result.final.length);
            for(var i=0;i<result.cursada.length;i++){
              result.cursada[i].fecha=result.cursada[i].fecha.replace("T00:00:00.000Z","");
            }
            for(var i=0;i<result.final.length;i++){
              console.log(result.final[i].fecha);
              result.final[i].fecha= result.final[i].fecha.replace("T00:00:00.000Z","");
            }
            console.log('ACA RECIBO LISTA DE ACTAS');
            console.log(res);
            this.actasListCursada = result.cursada;
            this.actasListFinal = result.final;
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
            //console.log(aux);
            var objetos = [];
            for(let i=0;i<aux.length ;i++){
              var valor = Object.values(aux[i]).toString();
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
                  objetos[2]= objetos[2].replace(/[.]/g,"");
                  notas.Udni= objetos[2];
                  notas.nota1= objetos[3];
                  notas.nota2= objetos[4];
                  notas.nota3=objetos[5];
                  notas.nota4=objetos[6];
                  notas.notaFinalNum=objetos[7];
                  notas.notaFinalLet= objetos[8];
                  notas.estado=objetos[9];
                  console.log(notas);
                 
                  if(notas.Udni!=""){
                    this.notasTotales.push(notas);
                  }
                  break;
                  case "final":
                    var notasFinal={
                      idacta:"",
                      Udni: "",
                      nota:"",
                      notaLetra:"",
                    }
                  objetos= valor.split(";");
                  objetos[1]= objetos[1].replace(/[.]/g,"");
                  notasFinal.Udni= objetos[1];
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
                if(valor.match("Materia:")){
                    valor = valor.replace("Materia: ","");
                    this.acta.idMat=valor;
                    console.log(valor);
                }
                if(valor.match("Fecha:")){
                  valor =valor.replace(/[ ]/g,"");
                  valor = valor.replace("Fecha:","");
                  var fecha = valor.split("/");
                  console.log(fecha);
                  valor = fecha[2]+"-"+fecha[1]+"-"+fecha[0];
                  this.acta.fecha=valor;
                  console.log(valor);
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
                console.log(valor);
         }
      }            
      }
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  eliminarActa(actaSelect:any){
    this.usuariosService.eliminarActa(actaSelect.nroActa,actaSelect.tipo).subscribe(
      res => {
        console.log("Se guardaron las notas");
        this.load=false
        this.ngOnInit();
      },
      err => {        
        console.log("ERROR");
        console.log(err);
        this.load=false
      }
    )

  }
modificarActa(actaSelect:any){
  this.usuariosService.modificarActa(actaSelect).subscribe(
    res => {
      console.log("Se guardaron las notas");
      this.load=false
      this.ngOnInit();
    },
    err => {        
      console.log("ERROR");
      console.log(err);
      this.load=false
    }
  )
    
  }
  async onSubmit() {  
    this.load=true;
    this.cargaFile();
    setTimeout(()=>{   
     console.log("IMPRIMO EN SUBMIT");                        
    console.log(this.acta);
    console.log(this.notasTotales);
    if((this.flag_cursada==true && this.acta.tipo=="cursada")||(this.flag_final==true && this.acta.tipo=="final")){

    this.usuariosService.crearActa(this.acta).subscribe(  
      res => {
        const result:any = res;
        for(var i =0; i < this.notasTotales.length;i++){
          this.notasTotales[i].idacta =  result.id;
        }
        this.usuariosService.agregarNotas(this.notasTotales,this.acta.tipo).subscribe(
          res => {
            console.log("Se guardaron las notas");
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
    console.log("TIPO INCORRECTO");
    this.load=false;
  }
  }, 3000);
  
  }
  
  actaCursada(){
    this.flag_cursada=true;
    this.flag_final=false;
  }

  actaFinal(){
    this.flag_final=true;
    this.flag_cursada=false;
  }

}
