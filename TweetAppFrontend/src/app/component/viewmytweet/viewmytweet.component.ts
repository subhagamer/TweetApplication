import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ɵcomputeMsgId } from '@angular/localize';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/model/tweet.model';
import { TweetService } from 'src/app/service/tweet.service';

function sortFn(a:Tweet, b:Tweet){
  if ( a.tweetId < b.tweetId  ){
    return -1;
  }
  if ( a.tweetId > b.tweetId ){
    return 1;
  }
  return 0;
}

@Component({ 
  selector: 'app-viewmytweet',
  templateUrl: './viewmytweet.component.html',
  styleUrls: ['./viewmytweet.component.css']
})
export class ViewmytweetComponent implements OnInit {
  msg:String=''
  msgtype=''
  del:number=-1
  tweetModify=''
  initials=""
  profileColor=""
  totalItem=0
  saved=false
  page=0
  size=3
  constructor(private elementRef: ElementRef,private formBuilder: FormBuilder,
    private tweetService:TweetService,private router:Router) { }
    editAllow=-1
    tweet:Tweet[]=[]
    ngOnInit(): void {
      if(localStorage.getItem('pageBgColor') !=null) 
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundImage = localStorage.getItem('pageBgColor');
    else
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = localStorage.getItem('linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 88%)');
    this.initials=(localStorage.getItem('initials') || '');
    this.profileColor=(localStorage.getItem("profileColor") || "orange");
      this.loadData();
  }
  loadData(){
    this.tweetService.loadMyTweets(this.page,this.size).subscribe(data=>{
        if(data!=null){
        console.log(data)
        this.tweet=data.tweets.sort(sortFn)
        this.totalItem=data.totalItems
        this.page=data.currentPage
        this.tweet=this.tweet.filter(a=>a.deleted!=true)
        console.log(this.tweet==null)
        }
    },
    error=>{
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
  editField(t:number){
    this.editAllow=t
  }
  deleteField(t:number){
    this.del=t
    this.tweetService.deleteTweet(t).subscribe(data=>{
      this.msgtype='alert alert-danger'
      this.msg="Failed to delete Tweet!"
    },async error=>{
      console.log(error.status)
      if(error.status==200){
      this.msg="Tweet deleted!"
      this.msgtype='alert alert-success'
      }
      else{
        this.msgtype='alert alert-danger'
        this.msg="Session expired"
      }
      await new Promise(resolve => setTimeout(resolve, 1000)).then(); 
      this.loadData()
    });
    
  }
  cancelEdit(){
    this.editAllow=-1
    this.loadData()
  }
  saveTweet(t:Tweet){
    if (this.tweetModify!='')
    t.tweet=this.tweetModify
    this.tweetService.updateTweet(t.tweetId,t).subscribe(async data=>{
      this.editAllow=-1
      this.msg="Tweet updated successfully!"
      this.msgtype='alert alert-success'
      this.saved=true
      await new Promise(resolve => setTimeout(resolve, 1000)).then(); 
      this.saved=false
      this.loadData()
    },error=>{
      this.msg="Some error happened! Maybe session expired "
      this.msgtype='alert alert-danger'
    })
  }
  change='';
  updateTitle(tweet: string) {
    if (tweet!='')
      this.tweetModify=tweet
    // console.log(tweet);
  }
  tweetdetails(t:Tweet){
    var prepare= 'Posted by '+t.tweetedBy+'on '+t.tweetPostDate
    if(t.edited){
      prepare=prepare+' and last edited on '+t.editedDate
    }
  }
  setPage(n:number){
    this.page=this.page+n
    this.loadData()
  }
  adjustTweetSize(size:number){
    this.size=size;
    this.page=0
    // console.log(this.size)
    this.loadData();
    console.log(this.page)
    // console.log(this.totalItem)
  }
}
