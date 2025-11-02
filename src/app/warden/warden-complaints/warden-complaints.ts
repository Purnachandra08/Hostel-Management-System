import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-warden-complaints',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './warden-complaints.html',
  styleUrls: ['./warden-complaints.css']
})
export class WardenComplaints implements OnInit {
  complaints: any[] = [];
  loading = true;
  error = '';
  message = '';

  private readonly baseUrl = 'http://localhost:8080/api/complaints';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchComplaints();
  }

  // 🔄 Fetch all complaints
  fetchComplaints(): void {
    this.loading = true;
    this.http.get<any[]>(`${this.baseUrl}/all`).subscribe({
      next: (res) => {
        this.complaints = res;
        this.loading = false;
      },
      error: () => {
        this.error = '❌ Failed to load complaints.';
        this.loading = false;
      }
    });
  }

  // ✅ Mark a complaint as resolved
  markResolved(id: number): void {
    this.http.put(`${this.baseUrl}/update-status/${id}?status=RESOLVED`, {}).subscribe({
      next: () => {
        this.message = '✅ Complaint marked as resolved!';
        this.fetchComplaints();
        setTimeout(() => (this.message = ''), 3000);
      },
      error: () => {
        this.error = '❌ Error resolving complaint.';
        setTimeout(() => (this.error = ''), 3000);
      }
    });
  }
}
