import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material.module';
import { BooksComponent } from './components/books/books.component';
import { AddEditBookDialogComponent } from './components/add-edit-book-dialog/add-edit-book-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './components/author/author.component';
import { AddEditAuthorDialogComponent } from './components/add-edit-author-dialog/add-edit-author-dialog.component';

@NgModule({
  declarations: [AppComponent, BooksComponent, AddEditBookDialogComponent, AuthorComponent, AddEditAuthorDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
