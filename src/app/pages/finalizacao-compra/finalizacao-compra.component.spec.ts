import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizacaoCompraComponent } from './finalizacao-compra.component';

describe('FinalizacaoCompraComponent', () => {
  let component: FinalizacaoCompraComponent;
  let fixture: ComponentFixture<FinalizacaoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizacaoCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizacaoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
