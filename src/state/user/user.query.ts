import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import { User } from 'src/models/User';
import { StateUser, UserStore } from './user.store';

@Injectable({
  providedIn: 'root'
})
export class UserQuery extends QueryEntity<StateUser, User> {
  constructor(protected store: UserStore) {
    super(store);
  }
}