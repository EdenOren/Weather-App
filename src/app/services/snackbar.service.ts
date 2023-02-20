import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  
  public sbSuccess(message: string) {
    this.snackBar.open(message, 'close', {duration: 2000,  panelClass: ['blue-snackbar']});
  }

  public sbError(message: string) {
    this.snackBar.open(message, 'close', {panelClass: ['red-snackbar']});
  }
}
