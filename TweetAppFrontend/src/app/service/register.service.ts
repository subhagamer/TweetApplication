import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Register {
  public constructor(init?: Partial<Register>) {
    Object.assign(this, init);
  }
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url: string;
  constructor(private http: HttpClient) {
      this.url = 'http://localhost:8080';
   }
   onRegister(register:Register){
    return this.http.post<String>(this.url+"/api/v1.0/tweets/register",register);
   }
}
