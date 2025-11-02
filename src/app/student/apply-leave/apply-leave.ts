import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LeaveService } from '../../services/leave'; // ✅ Use the proper service

interface LeaveRequest {
  type: string;
  fromDate: string;
  toDate: string;
  reason: string;
}

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apply-leave.html',
  styleUrls: ['./apply-leave.css']
})
export class ApplyLeave {
  leave: LeaveRequest = {
    type: '',
    fromDate: '',
    toDate: '',
    reason: ''
  };

  message = '';
  error = '';
  isSubmitting = false;

  constructor(private leaveService: LeaveService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.message = '';

    if (!this.leave.type || !this.leave.fromDate || !this.leave.toDate || !this.leave.reason) {
      this.error = '⚠️ Please fill in all fields before submitting.';
      return;
    }

    // ✅ Get logged-in user info
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.id) {
      this.error = '❌ Student not found. Please log in again.';
      this.router.navigate(['/login']);
      return;
    }

    const studentId = user.id;
    console.log('📤 Sending Leave Request:', this.leave);

    this.isSubmitting = true;

    // ✅ Call service instead of direct HttpClient
    this.leaveService.applyLeave(studentId, this.leave).subscribe({
      next: (res: any) => {
        console.log('✅ Leave applied successfully:', res);
        this.message = '✅ Leave applied successfully!';
        this.error = '';
        this.isSubmitting = false;
        this.leave = { type: '', fromDate: '', toDate: '', reason: '' };
        setTimeout(() => (this.message = ''), 3000);
      },
      error: (err: any) => {
        console.error('❌ Error while applying leave:', err);
        this.error = '❌ Failed to apply leave. Please try again.';
        this.message = '';
        this.isSubmitting = false;
      }
    });
  }
}
