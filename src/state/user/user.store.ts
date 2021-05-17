import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { User } from 'src/models/User';

export interface StateUser extends EntityState<User, string>, ActiveState {
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'user', resettable: true })
export class UserStore extends EntityStore<StateUser>{
  constructor() {
    super();
  }
}
