import { Injectable } from '@angular/core';
import { TaskQuery } from './task.query';
import { TaskStore } from './task.store';

@Injectable({
    providedIn: 'root'
  })

  export class TaskService {

    constructor(
      private taskStore: TaskStore,
      private taskQuery: TaskQuery
    ) {
    }

}