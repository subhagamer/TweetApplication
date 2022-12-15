import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/model/tweet.model';
import { User } from 'src/app/model/user.model';
import { TweetService } from 'src/app/service/tweet.service';

@Component({
  selector: 'app-viewallusers',
  templateUrl: './viewallusers.component.html',
  styleUrls: ['./viewallusers.component.css']
})
export class ViewallusersComponent implements OnInit {
  
  constructor(private elementRef: ElementRef,private formBuilder: FormBuilder,
    private tweetService:TweetService,private router:Router) { }

  user=''
  tweet:User[]=[]
  ngOnInit(): void {
    if(localStorage.getItem('pageBgColor') !=null) 
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundImage = localStorage.getItem('pageBgColor');
  else
  this.elementRef.nativeElement.ownerDocument
  .body.style.backgroundColor = localStorage.getItem('linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 88%)');
  
      var token=localStorage.getItem("token")
    if(token!=null){
      // console.log(token)
      this.user= JSON.parse(atob(token.split('.')[1])).sub
    }
      this.loadData();
  }
  allUsers:User[]=[]
  allUserData:User[]=[]
  loadData(){
    this.tweetService.loadAllUsers().subscribe(data=>{
      // console.log(data)
        this.allUsers=data
        this.allUserData=data

    },
    error=>{
      // console.log(error.status);
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
  tweets:Tweet[]=[]
  isViewingTweetOfUser=false;
  viewalltweet(t:User){
    this.tweetService.viewAllUserTweet(t).subscribe(data=>{
      this.tweets=data
      this.isViewingTweetOfUser=true
    },error=>{
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

  search:Search=new Search();
  updateEvent(t:string){
      this.allUsers=this.allUserData
      if(t!=''){        
        this.allUsers=this.allUsers.filter(a=>a.username.toUpperCase().includes(t.toUpperCase()));
      }
      else{
        this.allUsers=this.allUserData
      }
  }
  goBackToAllUsers(){
    
    this.isViewingTweetOfUser=false
    this.tweets=[]
  }

}
export class Search
{
  search=''
}
