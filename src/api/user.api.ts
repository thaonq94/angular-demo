import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/models/User';


@Injectable({
  providedIn: 'root'
})
export class UserApi {

  constructor(
    private http: HttpClient
  ) { }

  

  async getUsers() {
      return await this.http.get(`https://jsonplaceholder.typicode.com/users`, {}).toPromise().then(res => res);
  }

  async createUser(request: UserAPI.CreateUserRequest) {
    // return await this.http.post(`https://jsonplaceholder.typicode.com/users`, request).toPromise();
  }

  async updateUser(request: UserAPI.UpdateUserRequest) {
    // return await this.http.post(`https://jsonplaceholder.typicode.com/users`, request).toPromise();
  }

  async removeUser(user_id: string) {
    // return await this.http.post(`https://jsonplaceholder.typicode.com/users`, user_id).toPromise();
  }

}

export namespace UserAPI {
  export class CreateUserRequest {
    name?: string;
    email?: string;
    phone?: string;
    position?: string;
    status?: string;
  }
  export class UpdateUserRequest {
    id!: string;
    name?: string;
    email?: string;
    phone?: string;
    position?: string;
    status?: string;
  }
}
