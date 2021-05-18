import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropImageComponent } from './drag-and-drop-image.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';



@NgModule({
  declarations: [DragAndDropImageComponent],
  exports: [DragAndDropImageComponent],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DragAndDropImageModule { }
