import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService<T> {

  constructor(private dialog: MatDialog) {}

  openDialog(component: ComponentType<any>, afterClosed: () => void, data?: T): void {
    const dialogRef = this.dialog.open(component, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        afterClosed();
      }
    });
  }
}
