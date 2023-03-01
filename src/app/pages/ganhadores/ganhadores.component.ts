import { Logins } from './../../interfaces/logins';
import { Sorteios } from './../../interfaces/sorteios';
import { LoginsService } from './../../services/logins.service';
import { SorteiosService } from './../../services/sorteios.service';
import { Ganhadores } from './../../interfaces/ganhadores';
import { GanhadoresService } from './../../services/ganhadores.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ganhadores',
  templateUrl: './ganhadores.component.html',
  styleUrls: ['./ganhadores.component.scss']
})
export class GanhadoresComponent implements OnInit{

  constructor(private ganhadoresService: GanhadoresService,
    private sorteiosService: SorteiosService,
    private loginsService: LoginsService){}

  ganhadores: Ganhadores[] = []


  ngOnInit(): void {
    this.ganhadoresService.getGanhadores().subscribe(res => {
      this.ganhadores = res
    })

  }

}
