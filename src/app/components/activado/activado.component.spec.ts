import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivadoComponent } from './activado.component';

describe('ActivadoComponent', () => {
  let component: ActivadoComponent;
  let fixture: ComponentFixture<ActivadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
