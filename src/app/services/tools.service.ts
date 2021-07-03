import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
  
})
export class ToolsService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) { }

  alert(msg:string) {
    this._snackBar.open(msg, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
