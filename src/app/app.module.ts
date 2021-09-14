import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {UsuariosService} from './services/usuarios.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UsuariosIngresarComponent } from './components/usuarios-ingresar/usuarios-ingresar.component';
import { UsuariosRegistrarComponent } from './components/usuarios-registrar/usuarios-registrar.component';
import { UsuariosListarComponent } from './components/usuarios-listar/usuarios-listar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import {FormsModule} from '@angular/forms';
import { UsuariosPrincipalComponent } from './components/usuarios-principal/usuarios-principal.component';
import { UsuariosHomeComponent } from './components/usuarios-home/usuarios-home.component'
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { AlumnoListarAprobComponent } from './components/alumno-listar-aprob/alumno-listar-aprob.component';
import { AlumnoListarCorreComponent } from './components/alumno-listar-corre/alumno-listar-corre.component';
import { WebTPComponent } from './components/web-tp/web-tp.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AdminAbmAlumnoComponent } from './components/admin-abm-alumno/admin-abm-alumno.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminAbmMateriaComponent } from './components/admin-abm-materia/admin-abm-materia.component';
import { MateriasFilterPipe } from './pipes/materias-filter.pipe';
import { UsuariosFilterPipe } from './pipes/usuarios-filter.pipe';
import { ActivadoComponent } from './components/activado/activado.component';
import { AdminActaCursadaComponent } from './components/admin-acta-cursada/admin-acta-cursada.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { VerActaCursadaComponent } from './components/ver-acta-cursada/ver-acta-cursada.component';
import { NotasPipe } from './pipes/notas.pipe';
import { DatePipe } from '@angular/common';
import { AlumnoListarCursadaComponent } from './components/alumno-listar-cursada/alumno-listar-cursada.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UsuariosIngresarComponent,
    UsuariosRegistrarComponent,
    UsuariosListarComponent,
    UsuariosPrincipalComponent,
    UsuariosHomeComponent,
    AlumnoListarAprobComponent,
    AlumnoListarCorreComponent,
    WebTPComponent,
    FilterPipe,
    AdminAbmAlumnoComponent,
    AdminHomeComponent,
    AdminAbmMateriaComponent,
    MateriasFilterPipe,
    UsuariosFilterPipe,
    ActivadoComponent,
    AdminActaCursadaComponent,
    VerActaCursadaComponent,
    NotasPipe,
    AlumnoListarCursadaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule
  ],
  providers: [
    UsuariosService,
    AuthGuard,
    [DatePipe],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
