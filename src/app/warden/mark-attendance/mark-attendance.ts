import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Student {
  id: number;
  name: string;
  roomNo: string;
  status: string;
}

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mark-attendance.html',
  styleUrls: ['./mark-attendance.css']
})
export class MarkAttendance {
  students: Student[] = [
    { id: 1, name: 'Ravi Kumar', roomNo: '101', status: 'Pending' },
    { id: 2, name: 'Neha Sharma', roomNo: '102', status: 'Pending' },
    { id: 3, name: 'Aman Singh', roomNo: '103', status: 'Pending' },
    { id: 4, name: 'Pooja Patel', roomNo: '104', status: 'Pending' }
  ];

  markAttendance(student: Student, status: string): void {
    student.status = status;
  }

  submitAttendance(): void {
    alert('Attendance submitted successfully!');
    console.log('Attendance data:', this.students);
  }
}
