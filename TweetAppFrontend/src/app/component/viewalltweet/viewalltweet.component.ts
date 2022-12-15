import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Reply } from 'src/app/model/reply.model';
import { Tweet } from 'src/app/model/tweet.model';
import { LoginService } from 'src/app/service/login.service';
import { TweetService } from 'src/app/service/tweet.service';

export class Like {
  result = ''
}

function sortFunc(a: Tweet, b: Tweet) {
  if (a.tweetId > b.tweetId) {
    return -1;
  }
  if (a.tweetId < b.tweetId) {
    return 1;
  }
  return 0;
}
export class User {
  firstName = ''
  lastName = ''
  email = ''
  gender = ''
  profileColor = ''
}
@Component({
  selector: 'app-viewalltweet',
  templateUrl: './viewalltweet.component.html',
  styleUrls: ['./viewalltweet.component.css']
})
export class ViewalltweetComponent implements OnInit {

  like: Like[] = []
  msg: String = ''
  msgtype = ''
  del: number = -1
  tweetModify = ''
  saved = -1
  user = ''
  likeStats = ''
  initials = ''
  profileColor = ''
  tweetpost: Tweet = new Tweet();
  userMdl: User = new User();
  replyTweet: Tweet[] = [];
  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder,
    private tweetService: TweetService, private router: Router, private loginService: LoginService) { }
  editAllow = -1
  tweet: Tweet[] = []
  ngOnInit(): void {
    if (localStorage.getItem('pageBgColor') != null)
      this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundImage = localStorage.getItem('pageBgColor');
    else
      this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = localStorage.getItem('linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 88%)');

    var token = localStorage.getItem("token")

    if (token != null) {
      // console.log(token)
      this.user = JSON.parse(atob(token.split('.')[1])).sub
      this.loginService.findUser(JSON.parse(atob(token.split('.')[1])).sub).subscribe(data => {
        this.profileColor = data.profileColor
        this.initials = data.firstName.charAt(0) + data.lastName.charAt(0);
      })
    }
    this.loadData();
  }

  loadData() {
    this.tweetService.loadAllTweets().subscribe(data => {
      // console.log(data)
      this.tweet = data.sort(sortFunc)
      this.replyTweet = this.tweet.filter(a => a.parentTweetId > 0);
      this.tweet = this.tweet.filter(a => a.parentTweetId < 0);
      // console.log(this.tweet==null)
    },
      error => {
        // console.log(error.status);
        if (error.status == '401') {
          localStorage.removeItem("token");
          localStorage.setItem("loggedOut", "Session Ended.Please Log in")
          this.router.navigateByUrl("login")
        }
        else {
          localStorage.setItem("loggedOut", "Some error happened.Please log in and try again")
          this.router.navigateByUrl("login")
        }
      });
      
  }
  editField(t: number) {
    this.editAllow = t
  }
  async deleteField(t: number) {
    this.del = t
    this.tweetService.deleteTweet(t).subscribe(data => {
      this.msgtype = 'alert alert-danger'
      this.msg = "Failed to delete Tweet!"
    }, async error => {
      // console.log(error.status)
      if (error.status == 200) {
        this.msg = "Tweet deleted!"
        this.msgtype = 'alert alert-success'
      }
      else {
        this.msgtype = 'alert alert-danger'
        this.msg = "Session expired"
      }
    });
    await new Promise(resolve => setTimeout(resolve, 1000)).then();
    this.msg = ''
    this.msgtype = ''
    this.loadData()
  }
  cancelEdit() {
    this.editAllow = -1
    this.loadData()
  }
  saveTweet(t: Tweet) {
    if (this.tweetModify != '')
      t.tweet = this.tweetModify
    this.tweetService.updateTweet(t.tweetId, t).subscribe(async data => {
      this.editAllow = -1
      this.msg = "Tweet updated successfully!"
      this.msgtype = 'alert alert-success'
      this.saved = t.tweetId
      await new Promise(resolve => setTimeout(resolve, 1000)).then();
      this.saved = -1
      this.loadData()
    }, error => {
      this.msg = "Some error happened! Maybe session expired "
      this.msgtype = 'alert alert-danger'
    })
  }
  saveReplyTweet(r: Reply) {
    const t = new Tweet();
    t.tweet = r.tweet;
    t.tweetId = r.tweetId;
    if (this.tweetModify != '')
      t.tweet = this.tweetModify
    this.tweetService.updateTweet(t.tweetId, t).subscribe(async data => {
      this.editAllow = -1
      this.msg = "Tweet updated successfully!"
      this.msgtype = 'alert alert-success'
      this.saved = t.tweetId
      await new Promise(resolve => setTimeout(resolve, 1000)).then();
      this.saved = -1
      this.loadData()
    }, error => {
      this.msg = "Some error happened! Maybe session expired "
      this.msgtype = 'alert alert-danger'
    });

  }
  change = '';
  updateTitle(tweet: string) {
    if (tweet != '')
      this.tweetModify = tweet
    // console.log(tweet);
  }
  tweetdetails(t: Tweet) {
    var prepare = 'Posted by ' + t.tweetedBy + 'on ' + t.tweetPostDate
    if (t.edited) {
      prepare = prepare + ' and last edited on ' + t.editedDate
    }
  }
  likeField(t: number, likedBy: string[]) {
    // console.log('If present means btn change red to blue',likedBy,':',t)
    this.tweetService.likeField(t).subscribe(async data => {
      this.like = data
      if (this.like[0] != null) {
        console.log(this.like[0].result)
        this.msg = this.like[0].result
        // console.log(this.msg)
        this.msgtype = 'alert alert-success'
        this.saved = t
        // this.saved=false
        await new Promise(resolve => setTimeout(resolve, 800)).then();
        this.loadData();


      }
      this.isLiked(t, likedBy);
      this.loadData();
    }, error => {
      // console.log(error.error)
    });


    // location.reload()
  }
  isLiked(t: number, likedBy: string[]) {
    // console.log(t+':'+likedBy)
    if (likedBy != null) {
      if (likedBy.find(a => a === this.user) != null)
        return "btn btn-danger btn-sm"
    }
    return "btn btn-primary btn-sm"
  }
  reply = false
  parentTweetId = -1
  replyField(tweetId: number) {
    // this.tweetService.
    this.parentTweetId = tweetId;
    this.reply = true
  }
  revert() {
    this.reply = false
    this.parentTweetId = -1
  }
  onPostTweetReply() {
    this.tweetpost.parentTweetId = this.parentTweetId;
    this.tweetpost.tweetedBy = this.user
    this.parentTweetId = -1;
    this.reply = false
    console.log(this.tweetpost)
    this.tweetService.onPost(this.tweetpost)
      .subscribe(response => {
        var r = response as unknown as JSON
        var data: string[] = JSON.stringify(r).split(",");
        console.log(r)
        this.loadData();
      }, error => {
        console.log(error.status);
        if (error.status == '401') {
          localStorage.removeItem("token");
          localStorage.setItem("loggedOut", "Session Ended.Please Log in")
          this.router.navigateByUrl("login")
        }
        else {
          localStorage.setItem("loggedOut", "Some error happened.Please log in and try again")
          this.router.navigateByUrl("login")
        }
      });

  }

}
