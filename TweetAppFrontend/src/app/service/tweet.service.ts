import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from '../component/viewalltweet/viewalltweet.component';
import { Tweet } from '../model/tweet.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class TweetService {  
  private url: string;
  constructor(private http: HttpClient) {
      this.url = 'http://localhost:8080';
   }
   username=''
  onPost(post:any){
    var token=localStorage.getItem("token")
    var auth=''
    if(token!=null){
      // console.log(token)
      this.username= JSON.parse(atob(token.split('.')[1])).sub
      console.log(this.username)
      auth='Bearer '+token
    }
    var genUrl=this.url+"/api/v1.0/tweets/"+this.username+"/add"
    var header=new HttpHeaders({'Authorization':auth})
    // let options = new RequestOptions({headers:headers});
    //header.append('Authorization','Bearer '+token);
    let options = { headers: header };
    return this.http.post<Response>(genUrl,post,options,);

  }
  loadMyTweets() {
    var token=localStorage.getItem("token")
    var username=''
    var auth=''
    if(token!=null){
      // console.log(token)
      username= JSON.parse(atob(token.split('.')[1])).sub
      console.log(username)
      auth='Bearer '+token
    }
    var genUrl=this.url+"/api/v1.0/tweets/"+username
    var header=new HttpHeaders({'Authorization':auth})
    let options = { headers: header };
    return this.http.get<Tweet[]>(genUrl,options);
  }
  deleteTweet(id: number) {
    var token=localStorage.getItem("token")
    var username=''
    var auth=''
    if(token!=null){
      // console.log(token)
      username= JSON.parse(atob(token.split('.')[1])).sub
      // console.log(username)
      auth='Bearer '+token
    }
    var header=new HttpHeaders({'Authorization':auth})
    let options = { headers: header };
    var genUrl=this.url+"/api/v1.0/tweets/"+username+"/delete/"+id;
    return this.http.delete<String>(genUrl,options);
  }
  updateTweet(tweetId: number, tweet: Tweet) {
    var token=localStorage.getItem("token")
    var username=''
    var auth=''
    if(token!=null){
      // console.log(token)
      username= JSON.parse(atob(token.split('.')[1])).sub
      // console.log(username)
      auth='Bearer '+token
    }
    var header=new HttpHeaders({'Authorization':auth})
    let options = { headers: header};
    var genUrl=this.url+"/api/v1.0/tweets/"+username+"/update/"+tweetId;
    return this.http.put<Tweet>(genUrl,tweet, options);
  }
  loadAllTweets() {
    var token=localStorage.getItem("token")
    var auth=''
    if(token!=null){
      // console.log(token)
      this.username= JSON.parse(atob(token.split('.')[1])).sub
      // console.log(this.username)
      auth='Bearer '+token
    }
    var genUrl=this.url+"/api/v1.0/tweets/all"
    var header=new HttpHeaders({'Authorization':auth})
    let options = { headers: header };
    return this.http.get<Tweet[]>(genUrl,options);
  }
  likeField(tweetId: number) {
    var token=localStorage.getItem("token")
    var username=''
    var auth=''
    if(token!=null){
      // console.log(token)
      username= JSON.parse(atob(token.split('.')[1])).sub
      // console.log(username)
      auth='Bearer '+token
    }
    var header=new HttpHeaders({'Authorization':auth})
    let options = { headers: header};
    var genUrl=this.url+"/api/v1.0/tweets/"+username+"/like/"+tweetId;
    // console.log(genUrl)
    return this.http.put<Like[]>(genUrl,genUrl, options);
  }

  loadAllUsers() {
    var genUrl=this.url+"/api/v1.0/tweets/users/all"
    var token=localStorage.getItem("token")
    var auth=''
    if(token!=null){
      auth='Bearer '+token
    }
    var header=new HttpHeaders({'Authorization':auth})
    let options = { headers: header};
    // console.log(genUrl)
    return this.http.get<User[]>(genUrl, options);
  }
  viewAllUserTweet(t: User) {
    var genUrl=this.url+"/api/v1.0/tweets/users/all"
    var token=localStorage.getItem("token")
    var auth=''
    if(token!=null){
      auth='Bearer '+token
    }
    var header=new HttpHeaders({'Authorization':auth})
    let options = { headers: header};
    genUrl=this.url+'/api/v1.0/tweets/'+t.username
    return this.http.get<Tweet[]>(genUrl, options);
  }

}
