import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  url='http://localhost:8080';
  constructor(private router:Router,private http:HttpClient) { }

  onVisit(){
    console.log(this.router.url)
  }
  isValidToken(token:string){
    const options= {headers:new HttpHeaders({'Authorization':'Bearer '+token})}
    return this.http.get<String>(this.url+"/api/v1.0/tweets/register",options);
  }
}
