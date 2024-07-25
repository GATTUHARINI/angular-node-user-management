import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  activeform:'login' | 'signup' | 'navigate'|'forgotpassword'='signup';
  signupobj:signupModel = new signupModel();
  loginobj:loginModel = new loginModel();
  forgotpassobj:forgotpasswordModel=new forgotpasswordModel();
  Toggle(form: 'login'|'signup'){
    this.activeform=form;
   console.log(this.activeform);
  }
  
 
  constructor(private router:Router,private route: ActivatedRoute,private http: HttpClient) {
    console.log('Called Constructor');
    this.activeform='signup';
    this.route.queryParams.subscribe(params => {
        console.log(params);
        if(params.activeform)
        {
          this.activeform=params.activeform;
        }

        
    }); }

  navigate(route: string) {
    this.router.navigate([`/forgotpassword`]);
  }
 
  onsignup() {
  
    const localuser= localStorage.getItem('users');
    if(localuser != null) {
      const user = JSON.parse(localuser);
      const isEmailPresent=user.find((user:signupModel)=>user.email===this.signupobj.email);
      const isPhonePresent=user.find((user:signupModel)=>user.phone===this.signupobj.phone);
      const isUserPresent=user.find((user:signupModel)=>user.email===this.signupobj.email && user.phone===this.signupobj.phone);
      if(isUserPresent){
        alert("User with Email and Phonenumber already exists");
      }   
      else{
       if(isEmailPresent){
          alert("User Email already exists");
         }
          else{
                if(isPhonePresent){
                  alert("User Phonenumber already exists");
                 }
                 else{
                   user.push(this.signupobj);
                   localStorage.setItem('users',JSON.stringify(user)); 
                   this.activeform='navigate';
                }
             
         }
    }
  } 
     else{
      const user =[]; 
      user.push(this.signupobj);
      localStorage.setItem('users',JSON.stringify(user));
    
   this.activeform='navigate';
    }
  }

  onlogin() {
    this.http.post('http://localhost:3000/api/login', this.loginobj).subscribe(
      (response: any) => {
        alert(response.message);
        localStorage.setItem('loggeduser', JSON.stringify(response.user));
        this.router.navigate(['/welcome']);
      },
      (error) => {
        console.error('Login error:', error);
        alert('Login failed: ' + (error.error.message || 'Unknown error'));
        this.router.navigate(['/error']);
      }
    );
  }

 

 
 onResetPassword() {
    
    const localusers = localStorage.getItem('users');
    if(localusers != null) {
      const users = JSON.parse(localusers);
      const user = users.find((user:signupModel)=>user.email===this.forgotpassobj.email);
      if(user){
        user.password=this.forgotpassobj.newPassword;
        localStorage.setItem('users',JSON.stringify(users));
        //updating logged user password
        const logged = localStorage.getItem('loggeduser');
          if(logged) {
            const loggedUser=JSON.parse(logged);
            if(loggedUser.email===this.forgotpassobj.email) {
              loggedUser.password=this.forgotpassobj.newPassword;
              localStorage.setItem('loggeduser',JSON.stringify(loggedUser));
          }
        
        
        }
        alert("password updated successfully");
        this.activeform='login';
      }
      else{
        alert('user not found');  
      }
    }
    
    else{
      alert('user not found');
    }
  
  }
  ngOnInit(): void {

  }
}


export class signupModel {
  firstname:string;
  lastname:string;
  email:string;
  password:string;
  phone:string;
  constructor()
  {
    this.firstname="";
    this.lastname="";
    this.email="";
    this.password="";
    this.phone="";
  }  
}
export class loginModel {
  email:string;
  password:string;
  constructor()
  { 
    this.email="";
    this.password="";
  } 
}


export class forgotpasswordModel{
email:string;
newPassword:string;
constructor() {
  this.email="";
  this.newPassword="";
}
}
