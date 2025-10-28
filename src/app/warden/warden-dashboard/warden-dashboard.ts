import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-warden-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './warden-dashboard.html',
  styleUrls: ['./warden-dashboard.css']
})
export class WardenDashboard {
  wardenName = 'Mr. Rakesh Sharma';
  
  summaryCards = [
    { title: 'Total Students', value: 120, icon: '👨‍🎓', color: '#3498db' },
    { title: 'Leaves Pending', value: 8, icon: '📄', color: '#f39c12' },
    { title: 'Complaints', value: 5, icon: '⚠️', color: '#e74c3c' },
  ];
}
