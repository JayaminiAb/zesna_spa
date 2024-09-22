import { Component } from '@angular/core';
import { User } from '../../core/user';
import { Company } from '../../../petty_cash/core/petty-cash';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.scss'
})
export class UserMainComponent {
  companies: Company[] = [
    { label: 'Company A', value: 1 },
    { label: 'Company B', value: 2 },
    // Add more companies here
  ];
  users: User[] = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    { id: 3, username: 'alice_williams', email: 'alice@example.com', role: 'Moderator', status: 'Active' },
    { id: 4, username: 'bob_johnson', email: 'bob@example.com', role: 'Admin', status: 'Active' },
    { id: 5, username: 'charlie_brown', email: 'charlie@example.com', role: 'User', status: 'Suspended' }
  ];
  displayUserSlider: boolean = false;
  editingUser: boolean = false;
  newUser: User = { id: 0, username: '', email: '', role: '', status: '' };
  selectedCompany: Company;

  constructor() { }

  ngOnInit(): void {
    
  }

  onCompanyChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    
    this.filterHistory();
  }


  filterHistory() {
   
  }

  hideUserSlider(): void {
    this.displayUserSlider = false;
  }

  saveUser(): void {
    if (this.editingUser) {
      // Implement edit logic here
    } else {
      this.newUser.id = this.users.length + 1;
      // this.userService.addUser(this.newUser);
    }
    this.hideUserSlider();
  }
  showSlider(): void {
    this.displayUserSlider = true;
    this.editingUser = false;
   
  }
  
  addNewUser(){
    this.editingUser = true;
   this.newUser = { id: 0, username: '',  email: '', role: '', status: '' };
   this.showSlider();
  }
  viewUser(user: User): void {
    this.editingUser = true;
    this.newUser = user;
    // Implement view logic here
    this.showSlider();
  }

  editUser(user: User): void {
    this.editingUser = true;
    this.newUser = { ...user };
    this.displayUserSlider = true;
  }

  deleteUser(user: User): void {
    this.users = this.users.filter(u => u.id !== user.id);
  }
}
