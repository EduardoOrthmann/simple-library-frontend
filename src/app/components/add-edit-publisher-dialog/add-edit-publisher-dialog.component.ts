import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Publisher from 'src/app/interfaces/Publisher';
import { PublisherService } from 'src/app/services/publisher.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-edit-publisher-dialog',
  templateUrl: './add-edit-publisher-dialog.component.html',
  styleUrls: ['./add-edit-publisher-dialog.component.scss']
})
export class AddEditPublisherDialogComponent implements OnInit {
  publisherForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private publisherService: PublisherService,
    private dialogRef: MatDialogRef<AddEditPublisherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Publisher,
    private snackbarService: SnackbarService
  ) {
    this.publisherForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
        ]
      ],
      phone_number: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(13),
        ],
      ],
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.publisherForm.get(controlName);

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

    this.publisherForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.publisherForm.invalid) return;

    const publisherObservable = this.data
      ? this.publisherService.update(this.data.id, this.publisherForm.value)
      : this.publisherService.save(this.publisherForm.value);

    publisherObservable.subscribe({
      next: () => {
        this.snackbarService.openSnackBar(
          this.data
            ? 'Editora atualizada com sucesso'
            : 'Editora adicionada com sucesso',
          'done'
        );
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackbarService.openSnackBar(
          this.data ? 'Erro ao atualizar editora' : 'Erro ao adicionar editora',
          'done'
        );
      },
    });
  }
}
