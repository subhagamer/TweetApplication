import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { TweetService } from 'src/app/service/tweet.service';
import { User } from '../login/login.component';

export class Post {
  public constructor(init?: Partial<Post>) {
    Object.assign(this, init);
}
}

@Component({
  selector: 'app-posttweet',
  templateUrl: './posttweet.component.html',
  styleUrls: ['./posttweet.component.css']
})
export class PosttweetComponent implements OnInit {

  constructor(private elementRef: ElementRef,private formBuilder: FormBuilder,
    private tweetService:TweetService,private router:Router,
    private loginService:LoginService) { }

  tweetpost = this.formBuilder.group({
    tweet: ''
  });
  msg=''
  initials=""
  profileColor=""
  user:User=new User();
  ngOnInit(): void {
    if(localStorage.getItem('pageBgColor') !=null) 
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundImage = localStorage.getItem('pageBgColor');
  else
  this.elementRef.nativeElement.ownerDocument
  .body.style.backgroundColor = localStorage.getItem('linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 88%)');
  var token=localStorage.getItem("token")
  if(token!=null){
    this.loginService.findUser(JSON.parse(atob(token.split('.')[1])).sub).subscribe(data=>{
      this.user=data;
      this.profileColor=this.user.profileColor
      this.initials=this.user.firstName.charAt(0)+this.user.lastName.charAt(0);
    })
    console.log(this.initials)
  }
  
  }
  onPost(){
    this.tweetService.onPost(new Post(this.tweetpost.value))
    .subscribe(response => {
      var r=response as unknown as JSON
      var data:string[]=JSON.stringify(r).split(",");
      console.log(r)
      this.msg='Tweet is posted Successfully(Tweet id='+data[0].split(":")[1]+')'
    },error=>{
      console.log(error.status);
      if(error.status=='401'){
        localStorage.removeItem("token"); 
        localStorage.setItem("loggedOut","Session Ended.Please Log in")
        this.router.navigateByUrl("login")
      }
      else{
        localStorage.setItem("loggedOut","Some error happened.Please log in and try again")
        this.router.navigateByUrl("login")
      }
    });  
  }
}
