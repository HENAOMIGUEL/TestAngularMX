import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCorporativosComponent } from './detalle-corporativos.component';

describe('DetalleCorporativosComponent', () => {
  let component: DetalleCorporativosComponent;
  let fixture: ComponentFixture<DetalleCorporativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCorporativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCorporativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
