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
            .body.style.backgroundColor = localStorage.getItem('pageBgColor');
      else
      this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = localStorage.getItem('white');
    }

}
