import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

export class User {
  firstName = ''
  lastName = ''
  email = ''
  gender = ''
  profileColor = ''
}
export class Claim {
  password = ''
  confirmPassword = ''
  email = ''
}
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  errorMsg = '';
  errorPass = ''
  errorEmail = '';
  alert='';
  constructor(
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private loginService: LoginService,
    private router: Router
  ) { }
  username = ""
  initials = ''
  navigate = 0
  user: User = new User();
  claim: Claim = new Claim();
  ngOnInit(): void {
    if (localStorage.getItem('pageBgColor') != null)
      this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundImage = localStorage.getItem('pageBgColor');
    else
      this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = localStorage.getItem('linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 88%)');

  }

  async searchByUsername() {
    console.log(this.username)
    if (this.username != '')
      this.loginService.findUser(this.username).subscribe(data => {
        this.user = data
        this.navigate = 1
        this.errorMsg = ""
        if (this.user.profileColor == null)
          this.user.profileColor = "orange"
        console.log(data)
        this.initials = this.user.firstName.charAt(0) + this.user.lastName.charAt(0);
      },
        error => {
          this.errorMsg = "Username not Found"
        });
  }
  resetPassword() {
    if (this.checkIfValidInputs()) {
      const token = localStorage.getItem("token")
      var uname = this.username
      this.loginService.resetUser(uname, this.claim).subscribe(data => {
        this.errorMsg=data;
        this.claim=new Claim();
        this.alert='alert alert-success';
      },
        error => {
          this.errorMsg = "Email is incorrect"
          this.alert='alert alert-danger';
        });
    }
  }
  goBack() {
    this.navigate = 0
    this.errorMsg = ''
    this.username = ''
  }
  checkIfValidInputs() {
    if (this.claim.password == '' || this.claim.confirmPassword == '')
      this.errorPass = 'Password and/or Confirm Password is empty!!';
    else if (this.claim.confirmPassword != this.claim.password)
      this.errorPass = 'Password and confirm Password is not same'
    else
      this.errorPass = ''
    if (this.claim.email == '')
      this.errorEmail = 'Email cannot be empty'
    else
      this.errorEmail = ''

    if (this.errorEmail == this.errorPass)
      return true;
    else
      return false;
  }
}
