import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Loggedin } from 'src/app/model/loggedin.model';
import { Login } from 'src/app/model/login.model';
import { LoginService } from 'src/app/service/login.service';

export class User{
  firstName=''
  lastName=''
  email=''
  gender=''
  profileColor=''
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: '',
    password:'',
  });
  afterLogin!: Loggedin;
  errorMsg='';
  user:User=new User();
  msgtype='alert alert-danger'
  constructor(
        private formBuilder: FormBuilder,
        private elementRef: ElementRef,
        private loginService: LoginService,
        private router: Router
    )  { }

    ngOnInit(): void {
      if(localStorage.getItem('pageBgColor') !=null) 
          this.elementRef.nativeElement.ownerDocument
              .body.style.backgroundImage = localStorage.getItem('pageBgColor');
        else
        this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = localStorage.getItem('linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 88%)');
      
      var msg=localStorage.getItem("loggedOut")
      if(msg!=null){
        this.errorMsg=msg
        localStorage.removeItem("loggedOut")
      }

    }
  
  onLogin(){
    console.log(this.loginForm)
    this.loginService.onLogin(new Login(this.loginForm.value)).subscribe(data => {
        this.errorMsg=''
        this.afterLogin=data
        localStorage.setItem("token",this.afterLogin.token)
        window.alert("Success");
        this.router.navigateByUrl("/postatweet");
    },error =>{
      console.log(error)
        if(error.error!=null)
          this.errorMsg=error.error;
        else
          this.errorMsg='Server Error'
    });
  }
}
