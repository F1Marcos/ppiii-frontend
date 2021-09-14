import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-alumno-listar-cursada',
  templateUrl: './alumno-listar-cursada.component.html',
  styleUrls: ['./alumno-listar-cursada.component.css']
})
export class AlumnoListarCursadaComponent implements OnInit {

  constructor(private usuariosService:UsuariosService) { }

  materias:any = [];
  filterPost="";

  ngOnInit(): void {

    this.usuariosService.listarMateriasCursadas(localStorage.dni).subscribe(
			res => { 
        console.log('ACA RECIBO');
        console.log(res);
        this.materias = res;
      },
      err => {
        console.log(err.error.message);

        
      }
		)
  }

}
