import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import * as XLSX from 'ts-xlsx';


@Component({
  selector: 'app-alumno-listar-aprob',
  templateUrl: './alumno-listar-aprob.component.html',
  styleUrls: ['./alumno-listar-aprob.component.css']
})
export class AlumnoListarAprobComponent implements OnInit {

  constructor(private usuariosService:UsuariosService) { }
  materias:any = [];
  filterPost="";
  JSONData:any;
  ngOnInit(): void {

    this.usuariosService.listarMateriasAprobadas().subscribe(
			res => { 
        console.log('ACA RECIBO');
        console.log(res);
        this.materias = res;
        this.JSONData=this.materias
      },
      err => {
        console.log(err.error.message);

        
      }      

		)
	}

  
  
exportexcel(): void 
{
   const downloadLink = document.createElement('a');
   const dataType = 'application/vnd.ms-excel';
   const table = document.getElementById('tabla');
   const tableHtml = table?.outerHTML.replace(/ /g, ' ');
   document.body.appendChild(downloadLink);
   downloadLink.href = 'data:' + dataType + ' ' + tableHtml;
   downloadLink.download = 'tabla.xls';
   console.log(tableHtml);
   downloadLink.click();
  

}


}
