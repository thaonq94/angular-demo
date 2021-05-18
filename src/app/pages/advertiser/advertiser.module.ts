import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertiserComponent } from './advertiser.component';
import { RouterModule, Routes } from '@angular/router';
import { DragAndDropImageModule } from 'src/app/shared/components/drag-and-drop-image/drag-and-drop-image.module';

const routes: Routes = [
  {
    path: '',
    component: AdvertiserComponent,
    children: [
      {
        path: '**', redirectTo: 'users'
      }
    ]
  }
];

@NgModule({
  declarations: [AdvertiserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DragAndDropImageModule
  ]
})
export class AdvertiserModule { }
