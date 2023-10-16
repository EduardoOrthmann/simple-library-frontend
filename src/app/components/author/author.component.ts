import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Author from 'src/app/interfaces/Author';
import { AuthorService } from 'src/app/services/author.service';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AddEditAuthorDialogComponent } from '../add-edit-author-dialog/add-edit-author-dialog.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'birth_date',
    'nationality',
    'actions',
  ];
  dataSource!: MatTableDataSource<Author>;
  MAX_VISIBLE_STRING_LENGTH = 15;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: DialogService<Author>, private authorService: AuthorService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.getAll();
  }

  openDialog(data?: Author): void {
    this.dialog.openDialog(AddEditAuthorDialogComponent, () => this.getAll(), data);
  }

  getAll() {
    this.authorService.getAll().subscribe({
      next: (res: Author[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: Error) => {
        this.snackbarService.openSnackBar('Erro ao buscar autores', 'done');
        console.log(err);
      },
    });
  }

  delete(id: string): void {
    this.authorService.delete(id).subscribe({
      next: () => {
        this.snackbarService.openSnackBar('Autor deletado com sucesso', 'done');
        this.getAll();
      },
      error: (err: Error) => {
        this.snackbarService.openSnackBar('Erro ao deletar autor', 'done');
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
