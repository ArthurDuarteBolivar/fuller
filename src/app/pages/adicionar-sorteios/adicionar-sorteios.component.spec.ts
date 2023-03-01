import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarSorteiosComponent } from './adicionar-sorteios.component';

describe('AdicionarSorteiosComponent', () => {
  let component: AdicionarSorteiosComponent;
  let fixture: ComponentFixture<AdicionarSorteiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarSorteiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarSorteiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
