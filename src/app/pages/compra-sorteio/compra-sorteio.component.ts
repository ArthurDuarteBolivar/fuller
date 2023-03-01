import { Ganhadores } from './../../interfaces/ganhadores';
import { GanhadoresService } from './../../services/ganhadores.service';
import { RifasService } from './../../services/rifas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { count } from 'rxjs';
import { Sorteios } from './../../interfaces/sorteios';
import { SorteiosService } from './../../services/sorteios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-compra-sorteio',
  templateUrl: './compra-sorteio.component.html',
  styleUrls: ['./compra-sorteio.component.scss'],
})
export class CompraSorteioComponent implements OnInit {
  constructor(
    private actRoute: ActivatedRoute,
    private service: SorteiosService,
    private _snackBar: MatSnackBar,
    private rifaService: RifasService,
    private route: Router,
    private ganhadoresService: GanhadoresService
  ) {}

  paramRoute: any = '';
  sorteio: any = 0;
  valor: number = 0;
  counter: number = 0;
  valorSorteio: number = 0;
  nome: string = '';
  numerosRestantes: number = 0;
  numerosRestantesTotal: number = 0;
  ganhador!: Ganhadores;
  desconto: boolean = false

  ngOnInit(): void {

    this.actRoute.params.subscribe((res) => {
      this.paramRoute = res;
      this.service.getByTitulo(this.paramRoute.name).subscribe((res) => {
        this.sorteio = res;
        this.valorSorteio = this.sorteio.valor;
        this.counter = 1;
        this.valor = this.valorSorteio;
        this.nome = this.sorteio.titulo;
        this.ganhadoresService.getGanhadores().subscribe(ganhadores => {
          ganhadores.forEach((result) => {
            if(res.titulo == result.sorteios){
              this.ganhador = result
            }
          })
        })
      });
    });
    this.rifaService.getRifas().subscribe((res) => {
      res.map((res) => {
        if (res.sorteioID == this.sorteio.id) {
          const numerosArray = res.numeroRifas
            .split(',')
            .map((numero) => +numero);
          this.numerosRestantes += numerosArray.length;
          this.numerosRestantesTotal += numerosArray.length;
        }
      });

      this.numerosRestantes = this.numerosRestantes / this.sorteio.count_rifas;
      this.numerosRestantes = this.numerosRestantes * 100;
    });


  }


  codigo() {
    return this.nome + ':' + btoa(this.counter + ':' + this.valor);
  }

  contador(valor: number) {
    if (this.counter < this.sorteio.count_rifas - this.numerosRestantesTotal) {
      this.counter += valor;
      this.valor = this.counter * this.valorSorteio;
    } else {
      this.counter = this.sorteio.count_rifas - this.numerosRestantesTotal;
      this._snackBar.open('maximo de cotas possiveis para esse sorteio', 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
    if(this.counter >= 50){
      this.desconto = true;
      this.valor = this.valor - this.valor * 0.1
    }else{
      this.desconto = false
    }
  }

  diminui() {
    if (this.counter == 1) {
      this._snackBar.open('O minimo de cotas é 1!', 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    } else {
      this.counter = this.counter - 1;
      this.valor = this.counter * this.valorSorteio;
    }
    if(this.counter >= 50){
      this.desconto = true;
      this.valor = this.valor - this.valor * 0.1
    }else{
      this.desconto = false
    }
  }

  comprar() {
    if (this.counter < this.sorteio.count_rifas - this.numerosRestantesTotal) {
      this.route.navigate(['checkup', this.codigo()]);
    }else if(this.sorteio.count_rifas - this.numerosRestantesTotal == 0) {
      this.counter = this.sorteio.count_rifas - this.numerosRestantesTotal;
      this._snackBar.open('Sorteio não possui mais cotas', 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
    if(this.counter >= 50){
      this.desconto = true;
      this.valor = this.valor - this.valor * 0.1
    }else{
      this.desconto = false
    }
  }
}
