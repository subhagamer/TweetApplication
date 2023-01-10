import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { delay } from 'rxjs';
import { Register, RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    firstName: '',
    lastName:'',
    usertype:'user',
    gender:'female',
    username: '',
    password:'',
    email:'',
    profileColor:''
  });

  emailErrMsg='';
  lnameErrMsg='';
  fnameErrMsg='';
  unameErrMsg='';
  passErrMsg='';
  msgType='';
  msg='';
  constructor(
        private formBuilder: FormBuilder,
        private elementRef: ElementRef,
        private registerService:RegisterService
    )  { }

  ngOnInit(): void {
    if(localStorage.getItem('pageBgColor') !=null) 
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundImage = localStorage.getItem('pageBgColor');
  else
  this.elementRef.nativeElement.ownerDocument
  .body.style.backgroundColor = localStorage.getItem('linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 88%)');
  }
  
  onRegister(){
    //console.log(this.registerForm)
    this.validate()
    if(this.emailErrMsg==''&&this.lnameErrMsg==''&&this.fnameErrMsg==''&&this.unameErrMsg==''&&this.passErrMsg==''){
      this.registerService.onRegister(new Register(this.registerForm.value)).subscribe(data => {
        this.msgType='alert alert-success';
        this.msg='Registration Successful. Please proceed with Login'
        //console.log(data)
      },
      error =>{
        // console.log(error)
        this.msgType='alert alert-danger';
        this.msg='Username already exists!!';
      })
    }
  }

  validate(){
    this.emailErrMsg='';
    this.lnameErrMsg='';
    this.fnameErrMsg='';
    this.unameErrMsg='';
    this.passErrMsg='';
    if(this.registerForm.controls['firstName'].value=='')
      {
        this.fnameErrMsg='Name cannot be empty';
      }
      if(this.registerForm.controls['lastName'].value=='')
      {
        this.lnameErrMsg='Surname cannot be empty';
      }
      if(this.registerForm.controls['email'].value==''||this.registerForm.controls['email'].value==null)
      {
        this.emailErrMsg="Email cannot be empty";
      }
      else
      {
        const email=this.registerForm.controls['email'].value;
        var mailformat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email.match(mailformat))
          this.emailErrMsg="Incorrect email format";
      }
      if(this.registerForm.controls['username'].value=='')
      {
        this.unameErrMsg="Username cannot be empty";
      }
      if(this.registerForm.controls['password'].value=='')
      {
        this.passErrMsg="Password cannot be empty";
      }
  }
}
