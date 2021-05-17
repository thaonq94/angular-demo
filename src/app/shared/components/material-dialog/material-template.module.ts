import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogTemplateComponent } from './mat-dialog-template.component';
import { MaterialModule } from '../material';
import { MatDialog } from '@angular/material/dialog';



@NgModule({
  declarations: [MatDialogTemplateComponent],
  exports: [MatDialogTemplateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialog
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MaterialTemplateModule { }
