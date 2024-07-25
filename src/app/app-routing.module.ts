import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';

import { ErrorComponent } from './pages/error/error.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'/signup',
    pathMatch:'full'
   },
   {
    path:'signup',
    component:SignupComponent  
  },
  {
    path:'error',
    component:ErrorComponent
  },
  {
    path:'welcome',
    component:WelcomeComponent
  },
  {
    path:'profile/:firstname',
    component:ProfileComponent
    },
    {
      path:'admin',
      component:AdminComponent
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
