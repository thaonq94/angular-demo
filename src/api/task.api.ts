import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskApi {

  constructor(
    private http: HttpClient
  ) { }

  

  async getUsers() {
      return await this.http.get(`https://jsonplaceholder.typicode.com/users`, {}).toPromise().then(res => res);
  }

  async createUser(request: TaskAPI.CreateTaskRequest) {
    // return await this.http.post(`https://jsonplaceholder.typicode.com/users`, request).toPromise();
  }

  async updateUser(request: TaskAPI.UpdateTaskRequest) {
    // return await this.http.post(`https://jsonplaceholder.typicode.com/users`, request).toPromise();
  }


}

export namespace TaskAPI {
  export class CreateTaskRequest {
    name?: string;
    description?: string;
    start?: Date;
    end?: Date;
    link?: string;
    image_urls?: Array<string>;
  }
  
  export class UpdateTaskRequest {
    id?: string;
    name?: string;
    description?: string;
    start?: Date;
    end?: Date;
    link?: string;
    image_urls?: Array<string>;
  }
}
