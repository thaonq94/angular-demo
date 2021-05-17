import { Component, ViewChild } from '@angular/core';
import {MatDialogOptions} from "./mat-dialog.interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'core-mat-dialog-template',
  template: `
    <ng-template #matDialogTemplate>
      <div class="matdialog-container">
        <div class="dialog-header">
          <div class="dialog-title">{{options?.template?.title}}</div>
          <div class="close-button" (click)="closeDialog()">
          </div>
        </div>
        <div class="dialog-body" [innerHTML]="options?.template?.content"></div>
        <div class="dialog-footer">
          <div class="text-right">
            <button
              class="btn btn-outline {{options?.cancelStyle || 'btn-default'}} mr-2"
              [disabled]="loading" (click)="closeDialog()">
              {{options?.cancelTitle || 'Đóng'}}
            </button>
            <button class="btn {{options?.confirmStyle || 'btn-primary'}}" [disabled]="loading" (click)="confirm()">
              {{options?.confirmTitle || 'Xác nhận'}}
            </button>
          </div>
        </div>
      </div>
    </ng-template>
  `,
})

export class MatDialogTemplateComponent {
  @ViewChild('matDialogTemplate', { static: true }) matDialogTemplate: any;

  options?: MatDialogOptions;

  loading = false;

  dialogRef?: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog
  ) {
  }

  create(options: MatDialogOptions) {
    this.options = {...options};
    return this.matDialogTemplate;
  }

  open() {
    if (this.options?.template) {
      this.dialogRef = this.dialog.open(this.matDialogTemplate, this.options.config);
    } else if (this.options?.component) {
      this.dialogRef = this.dialog.open(this.options.component, this.options.config);
    } else {
      return;
    }

    this.dialogRef.afterClosed().subscribe(data => this.options?.afterClosedCb(data));
  }

  async confirm() {
    this.loading = true;

    try {
      if (this.options?.onConfirm) {
        await this.options.onConfirm();
      }
      this.dialogRef?.close(true);
    } catch (e) {}

    this.loading = false;
  }

  async closeDialog() {
    this.loading = true;

    try {
      if (this.options?.onCancel) {
        await this.options.onCancel();
      }
      this.dialogRef?.close();
    } catch (e) {}

    this.loading = false;
  }

}
