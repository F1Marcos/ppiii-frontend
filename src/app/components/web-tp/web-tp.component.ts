import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-web-tp',
  templateUrl: './web-tp.component.html',
  styleUrls: ['./web-tp.component.css']
})
export class WebTPComponent implements OnInit {
  multipleImages = [];

  comentarios: any = [];

  filterPost = "";
  
  com = {
    comentario: "",
    imagenURL: ""
  }
  alert: boolean = false;

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

SeleccionArchivo(event: any): void {
  if (event.target.files && event.target.files[0]) {
    this.file = <File>event.target.files[0];

    const file = new FileReader();
    file.onload = e => this.archivosseleccionado = file.result;
    file.readAsDataURL(this.file);
    console.log(this.file);
  }
}

agregarComentario() {
  console.log('IMPRIMO LO que tengo en el bloque COM');
  console.log('IMPRIMO LO que tengo en el bloque COM');
  console.log('IMPRIMO LO que tengo en el bloque COM');
  console.log('IMPRIMO LO que tengo en el bloque COM');
  console.log('IMPRIMO LO que tengo en el bloque COM');
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
selectImage(event: any) {
  if (event.target.files.length > 0 || event.target) {
    const file = event.target.files[0];
    this.images = file;
  }
}

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