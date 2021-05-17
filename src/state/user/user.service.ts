import { Injectable } from '@angular/core';
import { UserApi } from 'src/api/user.api';
import { User } from 'src/models/User';
import { UserQuery } from './user.query';
import { UserStore } from './user.store';

@Injectable({
    providedIn: 'root'
  })

  export class UserService {

    constructor(
      private userApi: UserApi,
      private userStore: UserStore,
      private userQuery: UserQuery
    ) {
    }

    async getUsers() {
        const res: any = await this.userApi.getUsers();
        this.userStore.set(res);
        console.log('res', this.userQuery.getAll())
        return res
    }
}