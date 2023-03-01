import { Sorteios } from './../../interfaces/sorteios';
import { SorteiosService } from './../../services/sorteios.service';
import { Logins } from './../../interfaces/logins';
import { Rifas } from './../../interfaces/rifas';
import { RifasService } from './../../services/rifas.service';
import { LoginsService } from './../../services/logins.service';
import { Component, Input, forwardRef } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-meus-numeros',
  templateUrl: './meus-numeros.component.html',
  styleUrls: ['./meus-numeros.component.scss'],
})
export class MeusNumerosComponent {
  form = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  rifas: Rifas[] = [];
  logins: any = [];
  id: number = 0;
  newRifas: Rifas[] = [];
  sorteios: Sorteios[] = []

  constructor(
    private loginsService: LoginsService,
    private RifaService: RifasService,
    private _snackBar: MatSnackBar,
    private sorteioService: SorteiosService
  ) {}

  buscar() {
    this.newRifas = [];
    const telefone = this.form.value!;
    if (!telefone) {
      this._snackBar.open('Numero de telefone não informado! Por favor informe o telefone', 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }
    this.sorteioService.getSorteios().subscribe(res => {
      this.sorteios = res
    })
    this.loginsService
      .getNumber(telefone.replace(/\D/g, ''))
      .subscribe((res) => {
        this.logins = res;
        if (res.length > 0) {
          this.logins.map((res: any) => {
            this.id = res.id;
          });
          this.RifaService.getRifas().subscribe((rifas: any) => {
            if(rifas.length > 0){
              rifas?.forEach((rifa: any) => {
                if (rifa?.pessoaID === this.id) {
                  if(rifa){
                    this.newRifas.push(rifa);
                    this.sorteios.map(res => {
                      if(res.id == rifa.sorteioID){
                        rifa.sorteioID = res.titulo;
                      }
                    })
                  }else{
                    this._snackBar.open('Nenhuma rifa encontrada', 'Ok', {
                      duration: 5000,
                      horizontalPosition: 'center',
                      verticalPosition: 'bottom',
                    });
                  }
                }
              });
            }else{
              this._snackBar.open('Nenhuma rifa encontrada', 'Ok', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
            }
          });
          return;
        }else{
        this._snackBar.open('Numero de telefone não encontrado', 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
      });
  }
}
