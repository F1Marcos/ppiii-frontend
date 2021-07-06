import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActaCursadaComponent } from './admin-acta-cursada.component';

describe('AdminActaCursadaComponent', () => {
  let component: AdminActaCursadaComponent;
  let fixture: ComponentFixture<AdminActaCursadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActaCursadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActaCursadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
