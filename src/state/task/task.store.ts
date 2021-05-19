import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Task } from 'src/models/Task';

export interface StateTask extends EntityState<Task, string>, ActiveState {
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'task', resettable: true })
export class TaskStore extends EntityStore<StateTask>{
  constructor() {
    super();
  }
}
