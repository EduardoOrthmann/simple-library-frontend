import { Component, ViewChild, OnInit } from '@angular/core';
import { AddEditBookDialogComponent } from '../add-edit-book-dialog/add-edit-book-dialog.component';
import { BookService } from 'src/app/services/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
import Book from 'src/app/interfaces/Book';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'isbn',
    'description',
    'publicationYear',
    'quantity',
    'genre',
    'author',
    'publisher',
    'actions',
  ];
  dataSource!: MatTableDataSource<Book>;
  MAX_VISIBLE_STRING_LENGTH = 15;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: DialogService<Book>, private bookService: BookService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.getAll();
  }

  openDialog(data?: Book): void {
    this.dialog.openDialog(AddEditBookDialogComponent, () => this.getAll(), data);
  }

  getAll() {
    this.bookService.getAll().subscribe({
      next: (res: Book[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: Error) => {
        this.snackbarService.openSnackBar('Erro ao buscar livros', 'done');
        console.log(err);
      },
    });
  }

  delete(id: string): void {
    this.bookService.delete(id).subscribe({
      next: () => {
        this.snackbarService.openSnackBar('Livro deletado com sucesso', 'done');
        this.getAll();
      },
      error: (err: Error) => {
        this.snackbarService.openSnackBar('Erro ao deletar livro', 'done');
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
