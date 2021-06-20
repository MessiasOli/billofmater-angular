import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) { }

  Request(msg:string) {
    this._snackBar.open(msg, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  NumberFormat(num:number){
    let stNumber : string;

    if(num == null || num == undefined) return "0,00";
  
    if((num+"").includes(",") && (num+"").includes(".")){
      stNumber = (num+"").replace(".", "").replace(",", ".")
    }else{
      stNumber = (num+"").replace(",", ".")
    }
  
    if(isNaN(num)){
      try { 
        return JSON.parse(stNumber.toLocaleLowerCase()); }
      catch { 
        console.log('NumberFormat: Falha na converção de valor :>> ', num);
        return num
      }
    }
    num = parseFloat(stNumber)
    stNumber = num.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 4});
    return num
  }
  
  ParseNumber(stNum: string) {
    let value : number = 0;

    if(!isNaN(+stNum))
      return parseFloat(stNum)

    value = parseFloat(stNum.replace(",", "."))
    return value
  }
}
