import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    if(localStorage.getItem('pageBgColor') !=null) 
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundImage = localStorage.getItem('pageBgColor');
  else
  this.elementRef.nativeElement.ownerDocument
  .body.style.backgroundColor = localStorage.getItem('linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 88%)');
  }
  submitDecision(){
    
  }
}
