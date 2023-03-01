import { Sorteios } from './../../interfaces/sorteios';
import { SorteiosService } from './../../services/sorteios.service';
import { Rifas } from './../../interfaces/rifas';
import { RifasService } from './../../services/rifas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorteios',
  templateUrl: './sorteios.component.html',
  styleUrls: ['./sorteios.component.scss']
})
export class SorteiosComponent implements OnInit{

  constructor(private sorteiosService: SorteiosService){}
  teste = "teste"
  sorteios: Sorteios[] = [];

  ngOnInit(): void {
    this.sorteiosService.getSorteios().subscribe(res => {
      this.sorteios = res;
    })
  }

}
