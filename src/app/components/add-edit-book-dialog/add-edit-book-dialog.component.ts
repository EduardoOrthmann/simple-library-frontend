import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import Book from 'src/app/interfaces/Book';

@Component({
  selector: 'app-add-edit-book-dialog',
  templateUrl: './add-edit-book-dialog.component.html',
  styleUrls: ['./add-edit-book-dialog.component.scss'],
})
export class AddEditBookDialogComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private dialogRef: MatDialogRef<AddEditBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private snackbarService: SnackbarService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      isbn: ['', Validators.required],
      description: ['', Validators.required],
      publicationYear: ['', Validators.required],
      quantity: ['', Validators.required],
      genre: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.data) return;

    this.bookForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    const bookObservable = this.data
      ? this.bookService.update(this.data.id, this.bookForm.value)
      : this.bookService.save(this.bookForm.value);

    bookObservable.subscribe({
      next: () => {
        this.snackbarService.openSnackBar(
          this.data
            ? 'Livro atualizado com sucesso'
            : 'Livro adicionado com sucesso',
          'done'
        );
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackbarService.openSnackBar(
          this.data ? 'Erro ao atualizar livro' : 'Erro ao adicionar livro',
          'done'
        );
      },
    });
  }
}
