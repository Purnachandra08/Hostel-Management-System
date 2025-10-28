import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboard {
  studentName = 'John Doe';
  notifications = [
    { message: 'Your leave request has been approved!', date: '2025-10-26' },
    { message: 'Mess fee due this week.', date: '2025-10-25' },
    { message: 'Room inspection scheduled for Friday.', date: '2025-10-24' }
  ];
}
