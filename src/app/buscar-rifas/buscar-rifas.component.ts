import { LoginsService } from './../services/logins.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rifas } from './../interfaces/rifas';
import { RifasService } from './../services/rifas.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buscar-rifas',
  templateUrl: './buscar-rifas.component.html',
  styleUrls: ['./buscar-rifas.component.scss'],
})
export class BuscarRifasComponent {
  rifa: Rifas = {
    pessoaID: undefined,
    numeroRifas: '',
    sorteioID: 0,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private rifaService: RifasService,
    private _snackBar: MatSnackBar,
    private loginsService: LoginsService
  ) {}

  buscarForm = this._formBuilder.group({
    numero: ['', Validators.required],
    sorteio: ['', Validators.required],
  });

  buscar() {
    this.rifaService.getRifas().subscribe((res) => {
      res.forEach((rifa) => {
        if (
          rifa.numeroRifas.includes(this.buscarForm.value.numero!) &&
          rifa.sorteioID == parseInt(this.buscarForm.value.sorteio!)
        ) {
          this.loginsService.getLogins().subscribe(res => {
            res.forEach((logins) => {
              if(rifa.pessoaID == logins.id){
                rifa.pessoaID = logins.nome;
              }
            })
          })
          this._snackBar.open('Rifa encontrada com sucesso', 'Ok', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
          this.rifa = rifa;
        } else {
          this._snackBar.open('Rifa não encontrada com sucesso', 'Ok', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
        }
      });
    });
  }

  deletar(id: string) {
    if(id){
      this.rifaService.deleteRifas(parseInt(id)).subscribe(
        (res) => {
          this._snackBar.open('apagado com sucesso', 'Ok', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
        },
        (error) => {
          this.rifaService.deleteRifas(parseInt(id)).subscribe((res) => {
            this._snackBar.open(`Erro: ${error}`, 'Ok', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['custom-snackbar'],
            });
          });
        }
      );
  }
}
}
