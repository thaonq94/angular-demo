import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskApi {

  constructor(
    private http: HttpClient
  ) { }

  

  async getTasks() {
      return
      //TODO
  }

  async createTask(request: TaskAPI.CreateTaskRequest) {
    //TODO
  }

  async updateTask(request: TaskAPI.UpdateTaskRequest) {
    //TODO
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
