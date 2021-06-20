import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-formmaterial',
  templateUrl: './formmaterial.component.html',
})
export class FormmaterialComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(FormmaterialComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

// @Component({
//   selector: 'app-formmaterial-dialog',
//   templateUrl: './formmaterial.component-dialog.html'
// })
// export class FormmaterialComponentDialog {}