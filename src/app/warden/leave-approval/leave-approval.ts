import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-approval.html',
  styleUrls: ['./leave-approval.css']
})
export class LeaveApproval {

  // ✅ Add all required properties
  leaveRequests = [
    { id: 1, studentName: 'Ravi Kumar', date: '2025-10-20', reason: 'Medical', status: 'Pending' },
    { id: 2, studentName: 'Anita Sharma', date: '2025-10-22', reason: 'Family Function', status: 'Approved' },
    { id: 3, studentName: 'Rahul Verma', date: '2025-10-25', reason: 'Personal', status: 'Rejected' }
  ];

  // ✅ Add required methods
  approveLeave(request: any) {
    request.status = 'Approved';
  }

  rejectLeave(request: any) {
    request.status = 'Rejected';
  }
}
