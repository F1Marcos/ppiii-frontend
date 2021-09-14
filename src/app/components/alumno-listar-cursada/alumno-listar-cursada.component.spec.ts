import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoListarCursadaComponent } from './alumno-listar-cursada.component';

describe('AlumnoListarCursadaComponent', () => {
  let component: AlumnoListarCursadaComponent;
  let fixture: ComponentFixture<AlumnoListarCursadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoListarCursadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoListarCursadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
