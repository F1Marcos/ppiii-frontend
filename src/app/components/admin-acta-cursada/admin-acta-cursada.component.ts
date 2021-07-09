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
    cuatrimestre:""
  }
  actasList: any = [];

  cargador:any=[];
  arrayBuffer:any;
  file: any;
  // archivosseleccionado: any;
  notasTotales:any=[];

  //DROPZONE:
  files: File[] = [];


  constructor(private usuariosService: UsuariosService, private http: HttpClient) { }

  ngOnInit(): void {
    this.usuariosService.verificarRol().subscribe(
			res => { 
        this.usuariosService.listarActasCursadas().subscribe(
          res => { 
            console.log('ACA RECIBO LISTA DE ACTAS');
            console.log(res);
            this.actasList = res;
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

 /*parcearCSV(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      let fileReader = new FileReader();
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
            var objetos = [];
            for(let i=0;i<aux.length ;i++){
              var valor = Object.values(aux[i]).toString();
              if(/^([0-9])/.test(valor)){
                var notas={
                  idacta:"",
                  Udni: "",
                  nota1:"",
                  nota2:"",
                  nota3:"",
                  nota4:"",
                  notaFinalNum:"",
                  notaLetra:"",
                  estado:""
                }
                
                objetos= valor.split(";");
                objetos =objetos.filter(function(el){
                  return el != "";
                });
                notas.Udni= objetos[2];
                notas.nota1= objetos[3];
                if(objetos[3]!="A" &&  Number(objetos[3])>=4){
                  notas.nota3= objetos[4];
                  
                  if(objetos[4]!="A" && Number(objetos[4])>=4){
                      notas.notaFinalNum = objetos[5];
                      notas.notaLetra= objetos[6]; 
                      notas.estado = objetos[7];       
                  }else{
                    notas.nota4= objetos[5];
                      notas.notaFinalNum = objetos[6];
                      notas.notaLetra= objetos[7]; 
                      notas.estado = objetos[8];   
  
                  }
  
                }else{
                  notas.nota2 = objetos[4];
                  notas.nota3 = objetos[5];
                  if( objetos[5]!="A" &&  Number(objetos[5])>=4)
                  {
                    notas.notaFinalNum = objetos[6];
                    notas.notaLetra= objetos[7]; 
                    notas.estado = objetos[8];  
  
  
                  }else{
                    notas.nota4=objetos[6];
                    notas.notaFinalNum = objetos[7];
                    notas.notaLetra= objetos[8]; 
                    notas.estado = objetos[9];  
  
                  }
                }
                this.notasTotales.push(notas);
              
              }else{
                valor =valor.replace(/[;]/g,"");
                if(valor.match("Materia:")){
                    valor = valor.replace("Materia: ","");
                    this.acta.idMat=valor;
                    console.log(valor);
                }
                if(valor.match("Curso:")){
                  valor = valor.replace("Curso: ","");
                  this.acta.curso =valor;
                  console.log(valor);
              }
              if(valor.match("Cuatrimestre:")){
                valor = valor.replace("Cuatrimestre: ","");
                if(valor.startsWith("1")){
                  this.acta.cuatrimestre= "Primero";
                }
                console.log(valor);
            }
              }
  
              if(!(valor=="")){
                this.cargador.push(valor);
              }
              
            }
           
           
            console.log(this.notasTotales);
            console.log(this.acta);
          }
      
      fileReader.readAsArrayBuffer(this.file);
  
    }
  
  }*/


//DROPZONE:
onSelect(event:any) {
  console.log(event);
  console.log(event.addedFiles[0]);
 
  this.files.push(...event.addedFiles);
}

onRemove() {
  delete this.file;
  console.log(this.file);
  
}

  parcearCSV(event:any): void {
    console.log('ACA IMPRIMO EVENTO MATI:');
    console.log(event);

    if (event.addedFiles && event.addedFiles[0]) {
      this.file = <File>event.addedFiles[0];
      console.log(this.file);
      console.log(this.file);
      console.log(this.file);
      console.log(this.file);
      console.log(this.file);
      console.log(this.file);
      console.log(this.file);
      console.log(this.file);

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
            var objetos = [];
            for(let i=0;i<aux.length ;i++){
              var valor = Object.values(aux[i]).toString();
              if(/^([0-9])/.test(valor)){
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
              
              }else{
                valor =valor.replace(/[;]/g,"");
                if(valor.match("Materia:")){
                    valor = valor.replace("Materia: ","");
                    this.acta.idMat=valor;
                    console.log(valor);
                }
                if(valor.match("Curso:")){
                  valor = valor.replace("Curso: ","");
                  this.acta.curso =valor;
                  console.log(valor);
              }
              if(valor.match("Cuatrimestre:")){
                valor = valor.replace("Cuatrimestre: ","");
                if(valor.startsWith("1")){
                  this.acta.cuatrimestre= "Primero";
                }
                console.log(valor);
            }
              }
  
              if(!(valor=="")){
                this.cargador.push(valor);
              }
              
            }
           
           
            console.log(this.notasTotales);
            console.log(this.acta);
          }
      
      fileReader.readAsArrayBuffer(this.file);
  
    }
  
  }

  onSubmit() {
    this.usuariosService.crearActa(this.acta).subscribe(  
      res => {
        const result:any = res;
        for(var i =0; i < this.notasTotales.length;i++){
          this.notasTotales[i].idacta =  result.id;
        }
        this.usuariosService.agregarNotas(this.notasTotales).subscribe(
          res => {
            console.log("Se guardaron las notas");
            this.ngOnInit();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

}
