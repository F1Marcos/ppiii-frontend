import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarioModel';
import { Router } from '@angular/router';


@Injectable({
	providedIn: 'root'
})

export class UsuariosService{
	 API_URI = 'http://localhost:3000/user';
	//API_URI = 'https://ppiii-demo1.herokuapp.com/user';

	logued$ = new EventEmitter<string>();
	
	constructor(private http: HttpClient, private router:Router) { }
	
	buscarUsuario(id:string){
		return this.http.get(`${this.API_URI}/find/${id}`);
	}

	guardarUsuario(usuario: Usuario) {
		return this.http.post(`${this.API_URI}/create`, usuario);
	}

	eleminarUsuario(id: string) {
		return this.http.delete(`${this.API_URI}/delete/${id}`);
	}

	actualizarUsuario(id: string, actualizaUsuario: Usuario): Observable<Usuario> {
		return this.http.put(`${this.API_URI}/update/${id}`, actualizaUsuario);
	}

	ingresar(usuario: any) {
		return this.http.post(`${this.API_URI}/signin`, usuario);
	}

	registrar(usuario: any) {
		return this.http.post(`${this.API_URI}/add`, usuario);
	}

	isLoggedIn(): Boolean {
		return !!localStorage.getItem('token'); //Si existe token retorna true
		//es el equivalente de testearlo con if pero ahora en una sola linea.
	}

	logOut() {
		//localStorage.removeItem('token');
		localStorage.clear();
		this.router.navigate(['usuarios/principal']);
	}
	getToken() {//Obtenemos el token que despues enviara el interceptor x cada req
		return localStorage.getItem('token');
	}
	listarMateriasAprobadas(dni: any) {
		console.log(dni);
		console.log(dni);
		return this.http.get(`${this.API_URI}/listMaterias/${dni}`);
	}

	listarMateriasCorrelativas(dni: any) {
		console.log(dni);
		console.log(dni);
		return this.http.get(`${this.API_URI}/listMateriasCorre/${dni}`);
	}

	listarComentarios() {
		//para expandir/especializar las variables usamos ` y no ' o "  
		//Las variables salen pintadas de otro color diferente del de texto
		return this.http.get(`${this.API_URI}/listComent`);
		//si no funciona usar 
		//return this.http.get(this.API_URI+'/list');
	}

	agregarComentarios(com: any) {
		//para expandir/especializar las variables usamos ` y no ' o "  
		//Las variables salen pintadas de otro color diferente del de texto
		console.log(com);
		return this.http.get(`${this.API_URI}/agregarComent`);
		//si no funciona usar 
		//return this.http.get(this.API_URI+'/list');
	}

	listarUsuarios() {
		//para expandir/especializar las variables usamos ` y no ' o "  
		//Las variables salen pintadas de otro color diferente del de texto
		return this.http.get(`${this.API_URI}/listarUsuarios`);
		//si no funciona usar 
		//return this.http.get(this.API_URI+'/list');
	}
	agregarUsuario(usuario: any) {
		//para expandir/especializar las variables usamos ` y no ' o "  
		//Las variables salen pintadas de otro color diferente del de texto
		console.log(usuario);
		return this.http.post(`${this.API_URI}/agregarUsuario`, usuario);
		//si no funciona usar 
		//return this.http.get(this.API_URI+'/list');
	}
	modificarUsuario(usuario: any) {
		console.log('FE: Metodo servicio Modificar Usuarios:')
		console.log(usuario);
		return this.http.post(`${this.API_URI}/modificarUsuario`, usuario);
	}
	eliminarUsuario(id: string) {
		console.log('FE: Metodo servicio Eliminar Usuario:')
		return this.http.delete(`${this.API_URI}/eliminarUsuario/${id}`); // El service devuelve "usuario" tal vez se puede usar para mostrar un mensaje.
	}
	// START ABM MATERIAS:
	listarMaterias() {
		//para expandir/especializar las variables usamos ` y no ' o "  
		//Las variables salen pintadas de otro color diferente del de texto
		return this.http.get(`${this.API_URI}/listarMaterias`);
		//si no funciona usar 
		//return this.http.get(this.API_URI+'/list');
	}
	modificarMateria(materia: any) {
		console.log('FE: Metodo servicio Modificar Materia:')
		console.log(materia);
		return this.http.post(`${this.API_URI}/modificarMateria`, materia);
	}
	eliminarMateria(idMat: string) {
		console.log('FE: Metodo servicio Eliminar Materia:')
		return this.http.delete(`${this.API_URI}/eliminarMateria/${idMat}`); // El service devuelve "usuario" tal vez se puede usar para mostrar un mensaje.
	}
	agregarMateria(materia: any) {
		//para expandir/especializar las variables usamos ` y no ' o "  
		console.log(materia);
		return this.http.post(`${this.API_URI}/agregarMateria`, materia);
		//si no funciona usar 
		//return this.http.get(this.API_URI+'/list');
	}

}
