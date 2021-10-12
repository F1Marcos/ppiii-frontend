import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.css']
})
export class AdminReportesComponent implements OnInit {

  searchTerm: string = "";
  page = 1;
  pageSize = 4;
  currentRate = 8;

  constructor(private http: HttpClient) { }
  opcion = 0;
  ngOnInit(): void {

    switch(this.opcion){
      
    }
  }

}
