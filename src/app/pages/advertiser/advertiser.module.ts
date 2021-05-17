import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertiserComponent } from './advertiser.component';
import { RouterModule, Routes } from '@angular/router';

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
  ]
})
export class AdvertiserModule { }
