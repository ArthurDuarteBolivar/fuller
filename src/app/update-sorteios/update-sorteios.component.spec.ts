import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSorteiosComponent } from './update-sorteios.component';

describe('UpdateSorteiosComponent', () => {
  let component: UpdateSorteiosComponent;
  let fixture: ComponentFixture<UpdateSorteiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSorteiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSorteiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
