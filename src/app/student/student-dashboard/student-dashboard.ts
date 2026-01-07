import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboard {

  /* 👤 Student Info */
  studentName = localStorage.getItem('authUsername') || 'Student';
  studentRoll = 'CSE2023-045';
  roomNumber = 'B-204';

  /* 🔔 Notifications */
  notifications = [
    { message: 'Warden approved your leave request', date: '2025-10-30' },
    { message: 'Room maintenance scheduled for tomorrow', date: '2025-10-31' }
  ];

  /* 🍽️ Daily Mess Menu */
  messMenu = {
    breakfast: 'Idli, Sambar, Chutney, Tea',
    lunch: 'Rice, Dal, Mixed Veg, Curd',
    dinner: 'Chapati, Paneer Curry, Rice'
  };

  constructor(private auth: Auth, private router: Router) {}

  /* 🚪 Logout */
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
