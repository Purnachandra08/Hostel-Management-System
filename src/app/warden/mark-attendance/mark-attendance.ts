import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mark-attendance.html',
  styleUrls: ['./mark-attendance.css']
})
export class MarkAttendance implements OnInit {
  students: any[] = [];
  todayRecords: any[] = [];
  attendanceData: { [studentId: number]: string } = {}; // store marked status
  loading = true;
  message = '';
  error = '';
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadTodayAttendance();
  }

  // ✅ Load all students
  loadStudents(): void {
    this.http.get<any[]>(`${this.baseUrl}/users/students`).subscribe({
      next: res => (this.students = res),
      error: err => {
        console.error(err);
        this.error = '❌ Failed to load students.';
      },
      complete: () => (this.loading = false)
    });
  }

  // ✅ Load today’s attendance
  loadTodayAttendance(): void {
    this.http.get<any[]>(`${this.baseUrl}/warden/attendance/today`).subscribe({
      next: res => (this.todayRecords = res),
      error: err => console.error(err)
    });
  }

  // ✅ Get current attendance status (existing or marked)
  getStatus(studentId: number): string {
    return this.attendanceData[studentId] || 'Not Marked';
  }

  // ✅ Mark one student’s status locally
  mark(studentId: number, status: 'PRESENT' | 'ABSENT'): void {
    this.attendanceData[studentId] = status;
  }

  // ✅ Submit all attendance at once
  submitAttendance(): void {
    const payload = Object.entries(this.attendanceData).map(([studentId, status]) => ({
      studentId: Number(studentId),
      status
    }));

    if (payload.length === 0) {
      this.error = '⚠️ Please mark attendance for at least one student.';
      return;
    }

    this.http.post(`${this.baseUrl}/warden/attendance/mark`, payload, { responseType: 'json' }).subscribe({
      next: (res: any) => {
        this.message = res.message || '✅ Attendance marked successfully!';
        this.error = '';
        this.loadTodayAttendance();
        this.attendanceData = {}; // reset after submit
      },
      error: err => {
        console.error('Error submitting attendance:', err);
        this.error = '❌ Failed to submit attendance.';
      }
    });
  }
}
