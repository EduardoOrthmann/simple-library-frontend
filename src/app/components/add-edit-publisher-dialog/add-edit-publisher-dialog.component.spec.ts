import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPublisherDialogComponent } from './add-edit-publisher-dialog.component';

describe('AddEditPublisherDialogComponent', () => {
  let component: AddEditPublisherDialogComponent;
  let fixture: ComponentFixture<AddEditPublisherDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPublisherDialogComponent]
    });
    fixture = TestBed.createComponent(AddEditPublisherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
