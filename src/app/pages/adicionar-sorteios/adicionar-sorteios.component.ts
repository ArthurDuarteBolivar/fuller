import { DialogComponent } from './../../components/dialog/dialog.component';
import { RifasService } from './../../services/rifas.service';
import { Ganhadores } from './../../interfaces/ganhadores';
import { GanhadoresService } from './../../services/ganhadores.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sorteios } from './../../interfaces/sorteios';
import { SorteiosService } from './../../services/sorteios.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adicionar-sorteios',
  templateUrl: './adicionar-sorteios.component.html',
  styleUrls: ['./adicionar-sorteios.component.scss']
})
export class AdicionarSorteiosComponent implements OnInit{

  constructor(private sorteiosService: SorteiosService,
    private _snackBar: MatSnackBar,
    private ganhadorService: GanhadoresService,
    private rifaService: RifasService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog){}

    sorteios: Sorteios[] = []

    sorteioForm = this._formBuilder.group({
      imagem: ['', Validators.required],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      data: ['', Validators.required],
      count_rifas: ['', Validators.required],
    });

    ngOnInit(): void {
      this.sorteiosService.getSorteios().subscribe(res => this.sorteios = res)
    }

  adicionar(){
    var body = {
      imagem: this.sorteioForm.value.imagem,
      titulo: this.sorteioForm.value.titulo,
      estado: "disponivel",
      data: this.sorteioForm.value.data,
      descricao: this.sorteioForm.value.descricao,
      valor: parseFloat(this.sorteioForm.value.valor!),
      count_rifas: parseInt(this.sorteioForm.value.count_rifas!)
    }
    this.sorteiosService.postSorteios(body).subscribe(res => {
      if(res){
        this._snackBar.open('Adicionado com sucesso', 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.sorteiosService.getSorteios().subscribe(res => this.sorteios = res)
      }
    }, (error) => {
      this._snackBar.open(`Ocorreu erro ${error}`, 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    })
  }

  deletar(id: number){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sorteiosService.getSorteios().subscribe(res => this.sorteios = res)
    });
  }
}
