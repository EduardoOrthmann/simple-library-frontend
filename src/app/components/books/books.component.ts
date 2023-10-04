import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBookDialogComponent } from '../add-edit-book-dialog/add-edit-book-dialog.component';
import { BookService } from 'src/app/services/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';

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
  dataSource!: MatTableDataSource<any>;
  MAX_VISIBLE_STRING_LENGTH = 15;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog, private bookService: BookService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  openSaveDialog() {
    const dialogRef = this.dialog.open(AddEditBookDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBooks();
      }
    });
  }

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(AddEditBookDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBooks();
      }
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: console.log,
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.snackbarService.openSnackBar('Livro deletado com sucesso', 'done');
        this.getBooks();
      },
      error: () => {
        this.snackbarService.openSnackBar('Erro ao deletar livro', 'done');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
