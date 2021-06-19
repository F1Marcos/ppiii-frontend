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
    img:""
  }
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
    this.usuariosService.agregarComentarios(this.com).subscribe(
			res => { 
        this.ngOnInit();
      },
			err => console.log(err)
		)
  }

}
