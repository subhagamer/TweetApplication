import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotpassComponent } from './component/forgotpass/forgotpass.component';
import { PosttweetComponent } from './component/posttweet/posttweet.component';
import { ViewmytweetComponent } from './component/viewmytweet/viewmytweet.component';
import { ViewalltweetComponent } from './component/viewalltweet/viewalltweet.component';
import { ViewallusersComponent } from './component/viewallusers/viewallusers.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'forgotpass',component:ForgotpassComponent},
  {path:'postatweet',component:PosttweetComponent},
  {path:'viewmytweet',component:ViewmytweetComponent},
  {path:'viewalltweet',component:ViewalltweetComponent},
  {path:'viewallusers',component:ViewallusersComponent},
  {path:'resetpassword',component:ResetpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
