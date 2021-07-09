import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerActaCursadaComponent } from './ver-acta-cursada.component';

describe('VerActaCursadaComponent', () => {
  let component: VerActaCursadaComponent;
  let fixture: ComponentFixture<VerActaCursadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerActaCursadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerActaCursadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
