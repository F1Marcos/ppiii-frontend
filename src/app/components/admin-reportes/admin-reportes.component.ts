import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UsuariosService } from '../../services/usuarios.service';
import { color } from 'html2canvas/dist/types/css/types/color';



@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.css']
})
export class AdminReportesComponent implements OnInit {
  
  // Pie |TORTA:
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [[]];
  public pieChartData: SingleDataSet = [0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  // FIN TORTA

  // START BARRAS:
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public chartColors: Array<any> = []

  public barChartData: ChartDataSets[] = [];
  // FIN BARRAS.

  materias:any = [];
  fileName= 'ExcelSheet.xlsx'; 
  filterPost:any = ""
  totalNotas:any = [];
  flagMostrar:boolean= true;
  dni:any = ""

  constructor(private http: HttpClient, private usuariosService:UsuariosService ) { }
  opcion = 0;
  ngOnInit(): void {

    
    this.barChartData = [];
    console.log(this.barChartData);
    this.usuariosService.reporteTodasMaterias().subscribe(
      res => { 
        console.log('ACA RECIBO');
        console.log(res);
        const estadisticas:any = res;
        console.log("estadisticas");
        console.log(estadisticas);
        var datos: any = [];
        var labels:any = "";
        var labelHead: any = [];
        console.log("estoy aca")
        console.log(this.barChartData);
        var barChartDataFlag: ChartDataSets[] = []

        for(var i =0; i < estadisticas.length; i++){
          
          if(!labelHead.includes(estadisticas[i]["anio"])){
            labelHead.push(estadisticas[i]["anio"])
          }

          if(labels.length == 0){
            labels = (estadisticas[i]["estado"])

          }else{

            if(labels == estadisticas[i]["estado"]){
              datos.push(estadisticas[i]["cantidad"])
              if(estadisticas.length - 1 == i){
                //this.barChartData.push( { data: datos, label: labels})
                barChartDataFlag.push( { data: datos, label: labels})
              }
            }else{
              //this.barChartData.push( { data: datos, label: labels})
              barChartDataFlag.push( { data: datos, label: labels})
              datos = []
              labels = estadisticas[i]["estado"]
              datos.push(estadisticas[i]["cantidad"])
            }
          }
        }
        this.barChartData = barChartDataFlag
        this.barChartLabels = labelHead;
        var backgroundColor:any = []
        for(var i = 0; i< 6;i++){
          var color = Math.floor(0x2030040 * Math.random()).toString(16);
          backgroundColor.push('#' + ('000000' + color).slice(-6));
       }
       this.chartColors =   [  { // all colors in order
        backgroundColor: backgroundColor
      }]
      


       
      },
      err => {
        console.log(err.error.message);
        this.usuariosService.logOut();
      } 
    )   

    this.usuariosService.listarMaterias().subscribe(
      res => { 
        console.log('ACA RECIBO');
        console.log(res);
        this.materias = res;
      },
      err => {
        console.log(err.error.message);
        this.usuariosService.logOut();
      } 
    )   

    switch(this.opcion){

      case 0 :
        this.usuariosService.reporteSexo().subscribe(
          res => { 
            const sexo: any = res;
            var data:any = [sexo[0]["cantidad"],sexo[1]["cantidad"]];
            this.pieChartLabels= [["Femenino","IFTS11"],["Masculino","IFTS11"]]
            this.pieChartData= [data];
            this.chartColors =   [  { // all colors in order
              backgroundColor: ['#ba0d4a','#151cd6']
            }]
          },
          err => {
            console.log(err.error.message);
            this.usuariosService.logOut();
          } 
        )   
        
        
        break;

      
      
    }
  }
  
  flag(flag:boolean){
    this.flagMostrar = !flag
  }
  
  buscarNotas(){
    console.log(this.dni);
    this.usuariosService.buscarNotasAlumno(this.dni).subscribe(
      res => { 
        this.totalNotas = res;

      },
      err => {
        console.log(err.error.message);
        //this.usuariosService.logOut();
      } 
    )   
  }

  logOut(){
    this.usuariosService.logOut();
  }
  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }

  // START PRINT TO PDF:
  downloadPDF() {
    // Extraemos el
    const DATA:any= document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

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
    }
    // DOC: https://mugan86.medium.com/exportar-pdfs-en-angular-con-jspdf-85c7a11a110f
    // END TO PRINT TO PDF:
}