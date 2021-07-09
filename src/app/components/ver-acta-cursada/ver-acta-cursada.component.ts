import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-acta-cursada',
  templateUrl: './ver-acta-cursada.component.html',
  styleUrls: ['./ver-acta-cursada.component.css']
})
export class VerActaCursadaComponent implements OnInit {

  acta: any = [];
  nroActa:any = "";
  filterPost="";
  constructor(private usuariosService: UsuariosService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.nroActa = this.route.snapshot.paramMap.get('nroActa')
      console.log(this.acta);
    }
  );

  this.usuariosService.verActa(this.nroActa).subscribe(
    res => { 
      console.log('ACA RECIBO LISTA DE ACTAS');
      console.log(res);
      this.acta = res;
    },
    err => {
      console.log(err.error.message);
    }
  )
  }

  modificarNota(notas:any){
    console.log(notas);
    this.usuariosService.modificarNota(notas,this.nroActa).subscribe(
      res => { 
        console.log(res);
        this.ngOnInit();
      },
      err => {
        console.log(err.error.message);
      }
    )

  }

  eliminarNota(notas:any){
  console.log(notas);
  this.usuariosService.eliminarNota(notas.Udni,this.nroActa).subscribe(
    res => { 
      console.log(res);
      this.ngOnInit();
    },
    err => {
      console.log(err.error.message);
    }
  )
  }

}
