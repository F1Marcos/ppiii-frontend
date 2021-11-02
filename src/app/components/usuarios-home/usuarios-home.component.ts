import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
declare var jQuery:any
declare var $:any

@Component({
  selector: 'app-usuarios-home',
  templateUrl: './usuarios-home.component.html',
  styleUrls: ['./usuarios-home.component.css']
})
export class UsuariosHomeComponent implements OnInit {

  usuario = "";
  porcentaje:number = 0;
  materias:any = [];
  fileName= 'ExcelSheet.xlsx'; 



  constructor(private usuariosService:UsuariosService,private router:Router) { }

  ngOnInit(): void {
    $("#tablaDescarga").hide();
    this.usuariosService.barraProgreso().subscribe(
      res => {
      const result:any = res;
      this.porcentaje=result.porcentaje;
      // this.porcentaje=+(this.porcentaje.toFixed(2));
      },
      err => {
        console.log(err.error.message);
        this.usuariosService.logOut();
      }
    );
    this.usuario = localStorage.nombreApellido;
  }
  descargarExcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('tablaDescarga'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }

  descarga(){
    this.usuariosService.listarMateriasAprobadas().subscribe(
      res => {
        this.materias=res;
        setTimeout(() => {
          this.downloadPDF()
        }, 3000);
      }
    )
  }

  downloadPDF() {
    console.log(this.materias)
    $("#tablaDescarga").show();
    // Extraemos el
    const DATA:any= document.getElementById('tablaDescarga');
    console.log(DATA);
    const doc = new jsPDF('l', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      console.log(img);
      

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 30;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_libreta-digital.pdf`);
    });
    $("#tablaDescarga").hide();

    
  }

  
    
  logOut(){
    this.usuariosService.logOut();
  }


}
