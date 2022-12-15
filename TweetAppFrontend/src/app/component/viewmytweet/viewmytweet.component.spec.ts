import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmytweetComponent } from './viewmytweet.component';

describe('ViewmytweetComponent', () => {
  let component: ViewmytweetComponent;
  let fixture: ComponentFixture<ViewmytweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmytweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmytweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
