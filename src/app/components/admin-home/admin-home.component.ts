import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  rol: string = "";
  usuario: string = "";
  
  constructor() { }

  ngOnInit(): void {
    this.rol = localStorage.rol;
    this.usuario = localStorage.usuario;
  }

}
