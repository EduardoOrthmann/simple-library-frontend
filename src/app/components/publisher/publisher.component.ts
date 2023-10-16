import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Publisher from 'src/app/interfaces/Publisher';
import { DialogService } from 'src/app/services/dialog.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AddEditPublisherDialogComponent } from '../add-edit-publisher-dialog/add-edit-publisher-dialog.component';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'phone_number',
    'actions',
  ];
  dataSource!: MatTableDataSource<Publisher>;
  MAX_VISIBLE_STRING_LENGTH = 15;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: DialogService<Publisher>, private publisherService: PublisherService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.getAll();
  }

  openDialog(data?: Publisher): void {
    this.dialog.openDialog(AddEditPublisherDialogComponent, () => this.getAll(), data);
  }

  getAll() {
    this.publisherService.getAll().subscribe({
      next: (res: Publisher[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: Error) => {
        this.snackbarService.openSnackBar('Erro ao buscar editoras', 'done');
        console.log(err);
      },
    });
  }

  delete(id: string): void {
    this.publisherService.delete(id).subscribe({
      next: () => {
        this.snackbarService.openSnackBar('Editora deletado com sucesso', 'done');
        this.getAll();
      },
      error: (err: Error) => {
        this.snackbarService.openSnackBar('Erro ao deletar editora', 'done');
        console.log(err);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
