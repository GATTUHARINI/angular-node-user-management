import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { signupModel } from '../signup/signup.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  firstname: string | null=null;
  users:signupModel[] = [];


  constructor(private router:Router,private route:ActivatedRoute,private http:HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.firstname=params.get('firstname');
      if(this.firstname){
        this.loadUserDetails(this.firstname);
      }
    });
      
  }

  loadUserDetails(firstname:string) {
      this.http.get<{userProfiles:signupModel[]}>(`http://localhost:3000/api/profile/${this.firstname}`).subscribe(
        response => { 
          this.users = response.userProfiles;
        },
        error => {
          console.error('error fetching user details:',error);
         
        }
      );
    
    }

  backToList() {
    this.router.navigate(['/admin']);
  }
  }
  
  

  


