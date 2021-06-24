import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-alumno-listar-corre',
  templateUrl: './alumno-listar-corre.component.html',
  styleUrls: ['./alumno-listar-corre.component.css']
})
export class AlumnoListarCorreComponent implements OnInit {

  materias:any = [];
  filterPost="";
  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.listarMateriasCorrelativas(localStorage.dni).subscribe(
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
