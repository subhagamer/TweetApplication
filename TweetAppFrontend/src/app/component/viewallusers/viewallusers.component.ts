import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/model/tweet.model';
import { User } from 'src/app/model/user.model';
import { data, TweetService } from 'src/app/service/tweet.service';

@Component({
  selector: 'app-viewallusers',
  templateUrl: './viewallusers.component.html',
  styleUrls: ['./viewallusers.component.css']
})
export class ViewallusersComponent implements OnInit {
  
  constructor(private elementRef: ElementRef,private formBuilder: FormBuilder,
    private tweetService:TweetService,private router:Router) { }

  user=''
  userPage=0
  userPageSize=3
  totalTweets=0
  totalItem=0
  tweet:User[]=[]
  pageSizeTweet=3
  currentPageTweet=0
  t:User=new User();
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
        this.allUsers=data.slice(this.userPage,this.userPage+this.userPageSize)
        this.allUserData=data 
        this.totalItem=this.allUserData.length;
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
    // console.log(t)
    this.t=t;
    this.tweetService.viewAllUserTweet(t,this.currentPageTweet,this.pageSizeTweet).subscribe(data=>{
      if(data!=null)
      {
        console.log(data)
        this.tweets=data.tweets
        this.totalTweets=data.totalItems
        this.isViewingTweetOfUser=true
      }
      else{
        this.tweets=[]
        this.isViewingTweetOfUser=true
        // console.log(this.tweets.length)
      }
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
  allUserSearchDataBak:User[]=[]
  search:Search=new Search();
  updateEvent(t:string){
      this.allUsers=this.allUserData
      if(t!=''){        
        this.allUsers=this.allUsers.filter(a=>a.username.toUpperCase().includes(t.toUpperCase()));
        this.allUserSearchDataBak=this.allUsers;
        this.totalItem=this.allUserSearchDataBak.length
      }
      else{
        this.userPage=0
        this.allUserSearchDataBak=[]
        this.totalItem=this.allUserData.length
        this.allUsers=this.allUserData.slice(this.userPage*this.userPageSize,this.userPage*this.userPageSize+this.userPageSize)
      }
      
      this.allUsers=this.allUsers.slice(this.userPage*this.userPageSize,this.userPage*this.userPageSize+this.userPageSize)
  }
  goBackToAllUsers(){
    
    this.isViewingTweetOfUser=false
    this.pageSizeTweet=3
    this.currentPageTweet=0
    this.tweets=[]
    this.t=new User();
  }
  setPage(n:number){
    this.userPage=this.userPage+n;
    this.updateData();
  }
  adjustPageSize(n:number){
    this.userPageSize=n;
    this.userPage=0
    this.updateData();
  }
  updateData(){
    if(this.allUserSearchDataBak.length==0)
      this.allUsers=this.allUserData.slice(this.userPage*this.userPageSize,this.userPage*this.userPageSize+this.userPageSize)
    else
    this.allUsers=this.allUserSearchDataBak.slice(this.userPage*this.userPageSize,this.userPage*this.userPageSize+this.userPageSize)
  }
  setTweetPage(n:number){
    this.currentPageTweet=this.currentPageTweet+n;
    this.viewalltweet(this.t);
  }
  adjustTweetPageSize(n:number){
    this.pageSizeTweet=n;
    this.currentPageTweet=0
  }
}
export class Search
{
  search=''
}
