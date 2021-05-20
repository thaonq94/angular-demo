import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/components/material';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: '**', redirectTo: 'tasks'
      }
    ]
  }
];

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TasksModule { }
