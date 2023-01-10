import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}
    ngAfterViewInit() {
      if(localStorage.getItem('pageBgColor') !=null) 
          this.elementRef.nativeElement.ownerDocument
              .body.style.backgroundImage = localStorage.getItem('pageBgColor');
        else
        this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = localStorage.getItem('linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(131,58,180,1) 88%)');
      
    }

}
