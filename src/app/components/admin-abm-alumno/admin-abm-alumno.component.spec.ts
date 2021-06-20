import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAbmAlumnoComponent } from './admin-abm-alumno.component';

describe('AdminAbmAlumnoComponent', () => {
  let component: AdminAbmAlumnoComponent;
  let fixture: ComponentFixture<AdminAbmAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAbmAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAbmAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
