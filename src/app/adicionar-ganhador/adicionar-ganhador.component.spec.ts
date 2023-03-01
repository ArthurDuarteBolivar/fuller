import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarGanhadorComponent } from './adicionar-ganhador.component';

describe('AdicionarGanhadorComponent', () => {
  let component: AdicionarGanhadorComponent;
  let fixture: ComponentFixture<AdicionarGanhadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarGanhadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarGanhadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
