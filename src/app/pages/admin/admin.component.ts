import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { signupModel } from '../signup/signup.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: signupModel[] = [];
  groupedUsers: { [key: string]: signupModel[] } = {};
  selectedFirstName: string | null=null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    const localUsers = localStorage.getItem('users');
    if (localUsers) {
      this.users = JSON.parse(localUsers);
      this.groupUsersByFirstName();
    } else {
      alert('No users found.');
      this.router.navigate(['/signup'], { queryParams: { activeform: 'signup' } });
    }
  }
  groupUsersByFirstName() {
    this.groupedUsers = this.users.reduce((acc, user) => {
      if (!acc[user.firstname]) {
        acc[user.firstname] = [];
      }
      acc[user.firstname].push(user);
      return acc;
    }, {} as { [key: string]: signupModel[] });
  }

  toggleView(firstname: string) {
    this.router.navigate(['/profile',firstname]);
  }
  backToList() {
    this.selectedFirstName = null;
    this.loadUsers(); // Refresh the user list
  }
  
  hasViewButton(firstname: string): boolean {
    return (this.groupedUsers[firstname] || []).length >= 1;
  }

}
