import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router,private navigationService:NavigationService){}
  btRegister="btn btn-primary"
  btLogin="btn btn-primary"
  btForgotPassword="btn btn-primary"
  btPostTweet="btn btn-secondary"
  btViewMyTweet="btn btn-primary"
  btViewAllTweet="btn btn-primary"
  btViewAllUsers="btn btn-primary"
  btResetPassword="btn btn-primary"
  btHome="btn btn-primary"
  isLoggedIn=false
  stillLoggedin=false
  ngOnInit(): void {
    this.isLoggedIn=false
    let token=localStorage.getItem("token")
    if(token!=null&& token!='')
    this.navigationService.isValidToken(token).subscribe(data=>{
      this.isLoggedIn=true
      const path=this.router.url
      console.log(path)
      if(path=='/'||path=='/register'||path=='/login'||path=='/forgotpass'){
        this.isLoggedIn=false
        this.stillLoggedin=true
      }
    },
      error=>{
        this.isLoggedIn=false
      })
    else
      this.isLoggedIn=false
    const path=this.router.url
    if(path.includes('/register')){
      this.btRegister="btn btn-secondary"
      this.btLogin="btn btn-primary"
      this.btForgotPassword="btn btn-primary"
      this.btHome="btn btn-primary"
    }
    else if(path.includes('/login')){
      this.btRegister="btn btn-primary"
      this.btLogin="btn btn-secondary"
      this.btForgotPassword="btn btn-primary"
      this.btHome="btn btn-primary"
    }
    else if(path.includes('/forgotpass')){
      this.btRegister="btn btn-primary"
      this.btLogin="btn btn-primary"
      this.btForgotPassword="btn btn-secondary"
      this.btHome="btn btn-primary"
    }
    else if(path=='/'){
      this.btRegister="btn btn-primary"
      this.btLogin="btn btn-primary"
      this.btForgotPassword="btn btn-primary"
      this.btHome="btn btn-secondary"
    }
    else if(path.includes('/postatweet')){
      this.btPostTweet="btn btn-secondary"
      this.btViewMyTweet="btn btn-primary"
      this.btViewAllTweet="btn btn-primary"
      this.btViewAllUsers="btn btn-primary"
      this.btResetPassword="btn btn-primary"
    }
    else if(path.includes('/viewmytweet')){
      this.btPostTweet="btn btn-primary"
      this.btViewMyTweet="btn btn-secondary"
      this.btViewAllTweet="btn btn-primary"
      this.btViewAllUsers="btn btn-primary"
      this.btResetPassword="btn btn-primary"
    }
    else if(path.includes('/viewalltweet')){
      this.btPostTweet="btn btn-primary"
      this.btViewMyTweet="btn btn-primary"
      this.btViewAllTweet="btn btn-secondary"
      this.btViewAllUsers="btn btn-primary"
      this.btResetPassword="btn btn-primary"
    }
    else if(path.includes('/viewallusers')){
      this.btPostTweet="btn btn-primary"
      this.btViewMyTweet="btn btn-primary"
      this.btViewAllTweet="btn btn-primary"
      this.btViewAllUsers="btn btn-secondary"
      this.btResetPassword="btn btn-primary"
    }
    else if(path.includes('/resetpassword')){
      this.btPostTweet="btn btn-primary"
      this.btViewMyTweet="btn btn-primary"
      this.btViewAllTweet="btn btn-primary"
      this.btViewAllUsers="btn btn-primary"
      this.btResetPassword="btn btn-secondary"
    }
  }
   onClickRegister(){
    this.router.navigate(['register']);
  }
  onClickHome(){
    this.router.navigate(['/']);
  }
  onClickLogin(){
    this.router.navigate(['login']);
  }
  onClickResetCreds(){
    this.router.navigate(['forgotpass']);
  }
  onClickToggleColor(){
    if(localStorage.getItem('pageBgColor') == 'linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 88%)'){
      localStorage.setItem('pageBgColor','linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,121,1) 49%, rgba(0,212,255,1) 100%)');
      localStorage.setItem('btnColor','');
    }
      else{
        localStorage.setItem('pageBgColor','linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 88%)');
        localStorage.setItem('btnColor','');
      }
      
    window.location.reload()
  }
  onClickPostTweet(){
    this.validateLoggedIn()
    this.router.navigateByUrl('postatweet')
  }
  onClickViewMyTweet(){
    this.validateLoggedIn()
    this.router.navigateByUrl('viewmytweet')
  }
  onClickViewAllTweet(){
    this.validateLoggedIn()
    this.router.navigateByUrl('viewalltweet')
  }
  onClickViewAllUsers(){
    this.validateLoggedIn()
    this.router.navigateByUrl('viewallusers')
  }
  onClickResetPassword(){
    this.validateLoggedIn()
    this.router.navigateByUrl('resetpassword')
  }
  onClickLogout(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('login')
  }
  validateLoggedIn(){
    var token=localStorage.getItem("token")
    if(token!=null&&token!='')
      this.isLoggedIn=true
    else {
      if(this.isLoggedIn==true)
        this.router.navigateByUrl("login")
      this.isLoggedIn=false
      localStorage.removeItem("token")
      localStorage.setItem("loggedOut","Session Ended.Please Log in")
    }
    
  }
}