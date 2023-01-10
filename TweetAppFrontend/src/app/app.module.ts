import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './component/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { ForgotpassComponent } from './component/forgotpass/forgotpass.component';
import { HttpClientModule } from '@angular/common/http';
import { PosttweetComponent } from './component/posttweet/posttweet.component';
import { ViewmytweetComponent } from './component/viewmytweet/viewmytweet.component';
import { ViewalltweetComponent } from './component/viewalltweet/viewalltweet.component';
import { ViewallusersComponent } from './component/viewallusers/viewallusers.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    ForgotpassComponent,
    PosttweetComponent,
    ViewmytweetComponent,
    ViewalltweetComponent,
    ViewallusersComponent,
    ResetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    CommonModule, 
    FormsModule, 
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
