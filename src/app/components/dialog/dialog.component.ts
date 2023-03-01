import { MatSnackBar } from '@angular/material/snack-bar';
import { SorteiosService } from './../../services/sorteios.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private sorteiosService: SorteiosService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
    this.sorteiosService.deleteSorteios(this.data).subscribe(res => {
      this._snackBar.open("excluido com sucesso", 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }, (error) => {
      this._snackBar.open(`Ocorreu erro ${error}`, 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

    })
  }

  close(){
    this.dialogRef.close();
  }

}
