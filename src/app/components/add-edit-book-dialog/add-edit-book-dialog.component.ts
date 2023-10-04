import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any
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
    if (this.data) {
      this.bookForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      if (this.data) {
        this.bookService
          .updateBook(this.data.id, this.bookForm.value)
          .subscribe({
            next: (res: any) => {
              alert('Book updated successfully');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
        this.bookService.addBook(this.bookForm.value).subscribe({
          next: (res: any) => {
            alert('Book added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
