import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-web-tp',
  templateUrl: './web-tp.component.html',
  styleUrls: ['./web-tp.component.css']
})
export class WebTPComponent implements OnInit {
  multipleImages = [];

  comentarios: any = [];

  filterPost = "";


  notasTotales:any=[];
  com = {
    comentario: "",
    imagenURL: "",
    usuario:""
  }
    acta = {
    materia: "",
    curso: "",
    cuatrimestre:""
  }
  cargador:any=[];

  alert: boolean = false;

  arrayBuffer:any;
  images: any;
  file: any;
  archivosseleccionado: any;

  constructor(private usuariosService: UsuariosService, private http: HttpClient) { }

ngOnInit(): void {

  this.usuariosService.listarComentarios().subscribe(
    res => {
      
      this.comentarios = res;

    },
    err => console.log(err)
  )
}
/*Upload() {
  let fileReader = new FileReader();
    fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
    }
    fileReader.readAsArrayBuffer(this.file);
}*/
selectImage(event: any): void {
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
                  this.acta.materia=valor;
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

/*SeleccionArchivo(event: any): void {
  if (event.target.files && event.target.files[0]) {
    this.file = <File>event.target.files[0];

    const file = new FileReader();
    file.onload = e => this.archivosseleccionado = file.result;
    file.readAsDataURL(this.file);
    console.log(this.file);
  }
}
*/
agregarComentario() {
  console.log('IMPRIMO LO que tengo en el bloque COM');
  console.log('IMPRIMO LO que tengo en el bloque COM');
  console.log('IMPRIMO LO que tengo en el bloque COM');
  console.log('IMPRIMO LO que tengo en el bloque COM');
  console.log('IMPRIMO LO que tengo en el bloque COM');
  console.log(this.com);
  // ACA filtramos los TAG HTML menos los pedidos:
  this.com.comentario=this.com.comentario.replace(/<(?!\/?b>|\/?strong>)[^>]+>/g, '');
  console.log("imprimo dsp de parcear");
  console.log(this.com);

  this.com.usuario= localStorage.nombreApellido;

  console.log(this.com);

  this.usuariosService.agregarComentarios(this.com).subscribe(
    res => {
      console.log("agregarComentario");
      this.ngOnInit();
    },
    err => console.log(err)
  )
}

// LINK https://github.com/funOfheuristic/fileUpload/blob/master/fileUpload_be/app.js
/*selectImage(event: any) {
  if (event.target.files.length > 0 || event.target) {
    const file = event.target.files[0];
    this.images = file;
  }
}*/

onSubmit() {

  console.log(this.images);
  const formData = new FormData();
  formData.append('file', this.images);
  console.log(formData);
  console.log(formData);
  console.log(formData);
  console.log(formData);
  this.http.post<any>('http://localhost:3000/user/uploads', formData).subscribe(
    (res) => {
      this.com.imagenURL=res.file;
      console.log(this.com);
      this.agregarComentario();
    },
    (err) => console.log(err)
  );
}

selectMultipleImage(event: any) {
  if (event.target.files.length > 0) {
    this.multipleImages = event.target.files;
  }
}

onMultipleSubmit() {
  const formData = new FormData();
  for (let img of this.multipleImages) {
    formData.append('files', img);
  }
  this.http.post<any>('http://localhost:3000/multipleFiles', formData).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
}
}