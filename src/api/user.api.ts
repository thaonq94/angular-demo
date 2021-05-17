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

}
