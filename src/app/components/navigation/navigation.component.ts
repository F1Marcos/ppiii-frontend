import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
  
})
export class NavigationComponent implements OnInit {
loginOkMostrar:boolean=false;

  constructor(private usuariosService:UsuariosService,private router:Router) { }
  ngOnInit(): void {
    if (localStorage.token) {
      this.loginOkMostrar = true;
    }
    else{
      this.loginOkMostrar = false;
    }
    this.usuariosService.logued$.subscribe(log => {
      this.loginOkMostrar = true;
      // this.sacarUsuario();
      });
  }
  logOut(){
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.
      this.usuariosService.logOut();
      this.loginOkMostrar=false;
      this.router.navigate(['/']);
    }
}
