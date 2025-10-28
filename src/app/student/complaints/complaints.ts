import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complaints.html',
  styleUrls: ['./complaints.css']
})
export class Complaints {
  complaint = {
    subject: '',
    description: ''
  };

  complaintsList: any[] = [];

  submitComplaint() {
    if (this.complaint.subject && this.complaint.description) {
      this.complaintsList.push({
        subject: this.complaint.subject,
        description: this.complaint.description,
        date: new Date()
      });
      alert('✅ Complaint Submitted Successfully!');
      this.complaint = { subject: '', description: '' };
    } else {
      alert('⚠️ Please fill all fields before submitting.');
    }
  }
}
