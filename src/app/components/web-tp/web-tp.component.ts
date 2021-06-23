import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';



@Component({
  selector: 'app-web-tp',
  templateUrl: './web-tp.component.html',
  styleUrls: ['./web-tp.component.css']
})
export class WebTPComponent implements OnInit {

  comentarios:any =[];
  filterPost="";
  com={
    comentario:"",
    imagenURL:File
  }
  comen:any=[
    "idcoment",
    "comentario",
    "imagenURL"

  ];
  alert:boolean=false;
  constructor(private usuariosService:UsuariosService) { }


  ngOnInit(): void {

    this.usuariosService.listarComentarios().subscribe(
			res => { 
        this.comentarios = res;
       
      },
			err => console.log(err)
		)
  }

  agregarComentario(){
    console.log(this.com.imagenURL);
    this.usuariosService.agregarComentarios(this.com).subscribe(
			res => { 
        console.log("hola");
        this.ngOnInit();
      },
			err => console.log(err)
		)
  }

}




