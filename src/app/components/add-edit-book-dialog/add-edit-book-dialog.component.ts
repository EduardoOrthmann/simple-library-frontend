import { AuthorService } from './../../services/author.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import Book from 'src/app/interfaces/Book';
import Genre from 'src/app/interfaces/Genre';
import AuthorName from 'src/app/interfaces/AuthorName';
import PublisherName from 'src/app/interfaces/PublisherName';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-add-edit-book-dialog',
  templateUrl: './add-edit-book-dialog.component.html',
  styleUrls: ['./add-edit-book-dialog.component.scss'],
})
export class AddEditBookDialogComponent implements OnInit {
  bookForm: FormGroup;
  genres!: Genre[];
  authorNames!: AuthorName[];
  publisherNames!: PublisherName[];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private dialogRef: MatDialogRef<AddEditBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private snackbarService: SnackbarService
  ) {
    this.bookForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      isbn: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      publication_year: [
        '',
        [Validators.required, Validators.max(new Date().getFullYear())],
      ],
      quantity: ['', [Validators.required, Validators.max(9999)]],
      genre: ['', [Validators.required]],
      author: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
    });

    this.bookService.getAllGenres().subscribe((genres) => {
      this.genres = genres;
    });

    this.authorService.getAllNames().subscribe((authorNames) => {
      this.authorNames = authorNames;
    });

    this.publisherService.getAllNames().subscribe((publisherNames) => {
      this.publisherNames = publisherNames;
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.bookForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Esse campo é obrigatório';
    }

    if (control?.hasError('minlength')) {
      return `O mínimo de caracteres é ${control.errors?.['minlength'].requiredLength}`;
    }

    if (control?.hasError('maxlength')) {
      return `O máximo de caracteres é ${control.errors?.['maxlength'].requiredLength}`;
    }

    if (control?.hasError('max')) {
      return `O número máximo é de ${control.errors?.['max'].max}`;
    }

    if (control?.hasError('pattern')) {
      return 'Esse campo aceita apenas números';
    }

    return '';
  }

  ngOnInit(): void {
    if (!this.data) return;
    
    this.bookForm.patchValue({
      ...this.data,
      genre: this.data.genre,
      author: this.data.author.id,
      publisher: this.data.publisher.id,
    });
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
