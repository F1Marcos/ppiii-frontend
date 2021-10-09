import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-alumno-listar-aprob',
  templateUrl: './alumno-listar-aprob.component.html',
  styleUrls: ['./alumno-listar-aprob.component.css']
})
export class AlumnoListarAprobComponent implements OnInit {

  constructor(private usuariosService:UsuariosService) { }
  materias:any = [];
  filterPost="";
  ngOnInit(): void {

    this.usuariosService.listarMateriasAprobadas(localStorage.dni).subscribe(
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
