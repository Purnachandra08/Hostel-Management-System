import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Warden } from '../../services/warden';
import { jsPDF } from 'jspdf';

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

  loadLeaves(): void {
    this.loading = true;
    this.wardenService.getLeaves().subscribe({
      next: data => {
        this.leaveRequests = data;
        this.loading = false;
      },
      error: () => {
        this.error = '❌ Failed to load leave requests.';
        this.loading = false;
      }
    });
  }

  approve(leave: any): void {
    this.wardenService.approveLeave(leave.id).subscribe({
      next: () => {
        leave.status = 'APPROVED';
        this.generateGatePassPDF(leave);
        this.message = '✅ Leave approved & gate pass generated!';
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
      }
    });
  }

  deleteLeave(id: number): void {
    if (!confirm('Are you sure you want to delete this request?')) return;

    this.wardenService.deleteLeave(id).subscribe({
      next: () => {
        this.leaveRequests = this.leaveRequests.filter(l => l.id !== id);
        this.message = '🗑️ Leave record deleted.';
        setTimeout(() => (this.message = ''), 3000);
      },
      error: () => {
        this.error = '❌ Failed to delete record.';
        setTimeout(() => (this.error = ''), 3000);
      }
    });
  }

  downloadGatePass(leave: any): void {
    this.generateGatePassPDF(leave);
  }

  private generateGatePassPDF(leave: any): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('🏫 Hostel Gate Pass', 70, 20);

    doc.setFontSize(12);
    doc.text(`Student Name: ${leave.studentName}`, 20, 40);
    doc.text(`Room Number: ${leave.roomNumber}`, 20, 50);
    doc.text(`Leave From: ${leave.startDate}`, 20, 60);
    doc.text(`Leave To: ${leave.endDate}`, 20, 70);
    doc.text(`Reason: ${leave.reason}`, 20, 80);
    doc.text(`Approved By: Warden`, 20, 100);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 110);

    doc.text('Signature: ___________________', 20, 140);

    doc.save(`GatePass_${leave.studentName}.pdf`);
  }
}
