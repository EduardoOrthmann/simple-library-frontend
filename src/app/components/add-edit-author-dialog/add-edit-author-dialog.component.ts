import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Author from 'src/app/interfaces/Author';
import { AuthorService } from 'src/app/services/author.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-edit-author-dialog',
  templateUrl: './add-edit-author-dialog.component.html',
  styleUrls: ['./add-edit-author-dialog.component.scss'],
})
export class AddEditAuthorDialogComponent implements OnInit {
  authorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private dialogRef: MatDialogRef<AddEditAuthorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Author,
    private snackbarService: SnackbarService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.authorForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      birth_date: ['', [Validators.required]],
      nationality: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    });

    this.dateAdapter.setLocale('pt-BR');
  }

  getErrorMessage(controlName: string): string {
    const control = this.authorForm.get(controlName);

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

    this.authorForm.patchValue({
      ...this.data,
    });
  }

  onSubmit() {
    if (this.authorForm.invalid) return;

    const bookObservable = this.data
      ? this.authorService.update(this.data.id, {
          ...this.authorForm.value,
          birth_date:
            this.authorForm.value.birth_date.toLocaleDateString('pt-BR'),
        })
      : this.authorService.save({
          ...this.authorForm.value,
          birth_date:
            this.authorForm.value.birth_date.toLocaleDateString('pt-BR'),
        });

    bookObservable.subscribe({
      next: () => {
        this.snackbarService.openSnackBar(
          this.data
            ? 'Autor atualizado com sucesso'
            : 'Autor adicionado com sucesso',
          'done'
        );
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackbarService.openSnackBar(
          this.data ? 'Erro ao atualizar o autor' : 'Erro ao adicionar o autor',
          'done'
        );
      },
    });
  }
}
