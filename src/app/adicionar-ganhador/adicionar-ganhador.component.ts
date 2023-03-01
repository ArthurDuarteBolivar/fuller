import { SorteiosService } from './../services/sorteios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GanhadoresService } from './../services/ganhadores.service';
import { Ganhadores } from './../interfaces/ganhadores';
import { Rifas } from './../interfaces/rifas';
import { Sorteios } from './../interfaces/sorteios';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-ganhador',
  templateUrl: './adicionar-ganhador.component.html',
  styleUrls: ['./adicionar-ganhador.component.scss']
})
export class AdicionarGanhadorComponent implements OnInit{

  constructor(private _formBuilder: FormBuilder,private ganhadorService: GanhadoresService,private _snackBar: MatSnackBar,
    private sorteiosService: SorteiosService){}

  GanhadorForm = this._formBuilder.group({
    nome: ['', Validators.required],
    sorteios: ['', Validators.required],
    numero_sorteado: ['', Validators.required],
  });

  sorteios: Sorteios[] = []
  tituloSorteio: string = "";


  ngOnInit(): void {
    this.sorteiosService.getSorteios().subscribe(res => this.sorteios = res)
  }


  adicionar(){
    const body: Ganhadores = {
      nome: this.GanhadorForm.value.nome!,
      sorteios: this.GanhadorForm.value.sorteios!,
      numero_sorteado: parseInt(this.GanhadorForm.value.numero_sorteado!)
    }

    this.ganhadorService.postGanhadores(body).subscribe(res => {
      this.sorteiosService.updateSorteios("encerrado", this.GanhadorForm.value.sorteios!).subscribe(res => {
        this._snackBar.open('ganhador adicionada com sucesso', 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar']
        });
      })
    }, (error) => {
      this._snackBar.open(`Erro ${error}`, 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['custom-snackbar']
      });
    })
  }

  testes(){
    console.log(this.tituloSorteio)
  }
}


