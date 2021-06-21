import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAbmMateriaComponent } from './admin-abm-materia.component';

describe('AdminAbmMateriaComponent', () => {
  let component: AdminAbmMateriaComponent;
  let fixture: ComponentFixture<AdminAbmMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAbmMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAbmMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
