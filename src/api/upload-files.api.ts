import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UploadFilesApi {

  constructor(
    private http: HttpClient
  ) { }

  

  async uploadFiles(formData: FormData) {
      return await this.http.post('/upload', formData).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
  }

}

