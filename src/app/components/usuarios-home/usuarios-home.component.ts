import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-home',
  templateUrl: './usuarios-home.component.html',
  styleUrls: ['./usuarios-home.component.css']
})
export class UsuariosHomeComponent implements OnInit {

  usuario = "";

  constructor() { }

  ngOnInit(): void {
    this.usuario = localStorage.nombreApellido;
  }

}
