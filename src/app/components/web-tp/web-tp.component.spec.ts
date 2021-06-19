import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTPComponent } from './web-tp.component';

describe('WebTPComponent', () => {
  let component: WebTPComponent;
  let fixture: ComponentFixture<WebTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebTPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
