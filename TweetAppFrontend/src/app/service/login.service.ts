import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login.model';
import { Loggedin } from '../model/loggedin.model';
import { Claim } from '../component/forgotpass/forgotpass.component';
export class UserModel{
  username=''
  email=''
  name=''
  gender=''
  profileColor=''
}
export class User{
  firstName=''
  lastName=''
  email=''
  gender=''
  profileColor=''
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string;
  constructor(private http: HttpClient) {
      this.url = 'http://localhost:8080';
   }

  onLogin(login: Login){
    return this.http.post<Loggedin>(this.url+"/api/v1.0/tweets/login",login);
  }
  findUser(username:String){
    const genUrl=this.url+"/api/v1.0/tweets/"+username+"/forgot"
    return this.http.get<User>(genUrl);
  }
  resetUser(username:String,claim:Claim)
  {
    const genUrl=this.url+"/api/v1.0/tweets/"+username+"/forgot"
    return this.http.put(genUrl,claim,{responseType: 'text'});
  }
  
}
