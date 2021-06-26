import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-activado',
  templateUrl: './activado.component.html',
  styleUrls: ['./activado.component.css']
})
export class ActivadoComponent implements OnInit {

  constructor(private route: ActivatedRoute,private usuariosService:UsuariosService) { }
  usuario:any;
  error:boolean=false;
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.usuario = this.route.snapshot.paramMap.get('id')
      console.log(this.usuario);
    }
  );

  this.usuariosService.activar(this.usuario).subscribe(
    res => {
      this.error=false;
      console.log("SE PUDO ACTIVAR");
      
        // this.router.navigate(['admin/abm']);
    },
    err => {
      this.error=true;
      console.log("NO SE PUDO ACTIVAR");
      // this.reintentar=true;
      // this.mensaje=err.error.message;      
    }
  );

  }

}
