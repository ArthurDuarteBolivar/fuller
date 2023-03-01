import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraSorteioComponent } from './compra-sorteio.component';

describe('CompraSorteioComponent', () => {
  let component: CompraSorteioComponent;
  let fixture: ComponentFixture<CompraSorteioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraSorteioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraSorteioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
