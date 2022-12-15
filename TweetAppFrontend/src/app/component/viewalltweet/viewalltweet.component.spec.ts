import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewalltweetComponent } from './viewalltweet.component';

describe('ViewalltweetComponent', () => {
  let component: ViewalltweetComponent;
  let fixture: ComponentFixture<ViewalltweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewalltweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewalltweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
