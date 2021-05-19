import { Injectable } from '@angular/core';
import { UserAPI, UserApi } from 'src/api/user.api';
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
      try {
        if (this.userQuery.getAll().length) {
          //Có api thì bỏ case này
          console.log('Có api thì bỏ case này')
          return;
        }
        console.log('Chạy tiếp')
        const res: any = await this.userApi.getUsers();
        res.map((user: User) => {
          user.position = 'dev',
          user.status =  user.status || 'enable'
        })
        this.userStore.set(res);
      } catch (e) {
        console.log('ERROR in getUsers', e);
      }
        
    }

    async createUser(request: UserAPI.CreateUserRequest) {
      try {
        await this.userApi.createUser(request);
        //Sau khi create thì gọi lại getUsers()
        this.userStore.add(request, { prepend: true })
      } catch(e) {
        console.log('ERROR in createUser', e);
      }
    }

    async updateUser(user: UserAPI.UpdateUserRequest) {
      try {
        await this.userApi.updateUser(user);
        if (user?.id) {
          this.userStore.update(user.id, user);
        }
      } catch(e) {
        console.log('ERROR in updateUser', e);
      }
    }

    setActiveUser(userId?: string) {
      this.userStore.setActive(userId!);
    }

    updateActiveUser(user: User) {
      this.userStore.updateActive(user);
    }
}