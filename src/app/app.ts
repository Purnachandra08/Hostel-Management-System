import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { User } from './services/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  users: any[] = [];
  message = '';

  constructor(private userService: User) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.message = '✅ Connected to backend successfully!';
        console.log('Users:', data);
      },
      error: (err) => {
        console.error('❌ Backend Error:', err);
        this.message = '❌ Failed to connect to backend';
      }
    });
  }
}
