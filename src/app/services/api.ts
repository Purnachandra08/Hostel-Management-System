import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {

  // 🧍 Mock Student List
  private students = [
    { id: 1, name: 'Rahul Sharma', roomNo: 'A101', status: 'Present' },
    { id: 2, name: 'Priya Patel', roomNo: 'A102', status: 'Absent' },
    { id: 3, name: 'Aman Gupta', roomNo: 'A103', status: 'Present' }
  ];

  // 🧾 Mock Leave Requests
  private leaves = [
    { id: 1, studentName: 'Rahul Sharma', reason: 'Medical', from: '2025-10-20', to: '2025-10-22', status: 'Pending' },
    { id: 2, studentName: 'Priya Patel', reason: 'Family Function', from: '2025-10-25', to: '2025-10-27', status: 'Pending' }
  ];

  // 🏠 Mock Room Data
  private rooms = [
    { id: 101, capacity: 2, occupants: 2, status: 'Full' },
    { id: 102, capacity: 2, occupants: 1, status: 'Available' },
    { id: 103, capacity: 3, occupants: 3, status: 'Full' }
  ];

  constructor() { }

  // ✅ Get All Students
  getStudents() {
    return this.students;
  }

  // ✅ Get All Pending Leaves
  getMockPendingLeaves() {
    return this.leaves.filter(l => l.status === 'Pending');
  }

  // ✅ Review Leave Request (Approve / Reject)
  reviewLeave(id: number, approve: boolean) {
    const leave = this.leaves.find(l => l.id === id);
    if (leave) {
      leave.status = approve ? 'Approved' : 'Rejected';
    }
  }

  // ✅ Mark Attendance
  markAttendance(studentId: number, status: string) {
    const student = this.students.find(s => s.id === studentId);
    if (student) {
      student.status = status;
    }
  }

  // ✅ Get Room List
  getRooms() {
    return this.rooms;
  }

  // ✅ Add Complaint (Mock)
  addComplaint(data: { studentName: string; complaint: string }) {
    console.log('Complaint submitted:', data);
  }

  // ✅ Apply Leave (Mock)
  applyLeave(data: any) {
    console.log('Leave applied:', data);
    this.leaves.push({ id: Date.now(), ...data, status: 'Pending' });
  }
}
