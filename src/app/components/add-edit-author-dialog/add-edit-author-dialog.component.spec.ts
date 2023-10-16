import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAuthorDialogComponent } from './add-edit-author-dialog.component';

describe('AddEditAuthorDialogComponent', () => {
  let component: AddEditAuthorDialogComponent;
  let fixture: ComponentFixture<AddEditAuthorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditAuthorDialogComponent]
    });
    fixture = TestBed.createComponent(AddEditAuthorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
