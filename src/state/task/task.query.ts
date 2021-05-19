import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import { Task } from 'src/models/Task';
import { StateTask, TaskStore } from './task.store';

@Injectable({
  providedIn: 'root'
})
export class TaskQuery extends QueryEntity<StateTask, Task> {
  constructor(protected store: TaskStore) {
    super(store);
  }
}