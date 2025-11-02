import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Warden } from '../../services/warden';

@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './leave-approval.html',
  styleUrls: ['./leave-approval.css']
})
export class LeaveApproval implements OnInit {
  leaveRequests: any[] = [];
  loading = true;
  message = '';
  error = '';

  constructor(private wardenService: Warden) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  // Load all leaves
  loadLeaves(): void {
    this.loading = true;
    this.wardenService.getLeaves().subscribe({
      next: (data) => {
        this.leaveRequests = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = '❌ Failed to load leave requests.';
        this.loading = false;
      }
    });
  }

  approve(id: number): void {
    this.wardenService.approveLeave(id).subscribe({
      next: () => {
        this.message = '✅ Leave approved successfully!';
        this.loadLeaves();
        setTimeout(() => (this.message = ''), 3000);
      },
      error: () => {
        this.error = '❌ Error approving leave.';
        setTimeout(() => (this.error = ''), 3000);
      }
    });
  }

  reject(id: number): void {
    this.wardenService.rejectLeave(id).subscribe({
      next: () => {
        this.message = '❌ Leave rejected successfully!';
        this.loadLeaves();
        setTimeout(() => (this.message = ''), 3000);
      },
      error: () => {
        this.error = '❌ Error rejecting leave.';
        setTimeout(() => (this.error = ''), 3000);
      }
    });
  }
}
