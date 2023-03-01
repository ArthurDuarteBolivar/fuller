import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarRifasComponent } from './buscar-rifas.component';

describe('BuscarRifasComponent', () => {
  let component: BuscarRifasComponent;
  let fixture: ComponentFixture<BuscarRifasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarRifasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarRifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
