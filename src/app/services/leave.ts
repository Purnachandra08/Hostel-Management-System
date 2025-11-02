import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private baseUrl = 'http://localhost:8080/api/leave';

  constructor(private http: HttpClient) {}

  // 🔹 Apply Leave
  applyLeave(studentId: number, leaveData: any): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });

    return this.http.post(`${this.baseUrl}/apply/${studentId}`, leaveData, { headers });
  }

  // 🔹 Get all leaves for a specific student
  getLeavesByStudent(studentId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });

    return this.http.get(`${this.baseUrl}/user/${studentId}`, { headers });
  }

  // 🔹 Get all leaves (Admin)
  getAllLeaves(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });

    return this.http.get(`${this.baseUrl}/all`, { headers });
  }

  // 🔹 Approve/Reject Leave (Admin)
  updateLeaveStatus(leaveId: number, status: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });

    return this.http.put(`${this.baseUrl}/update-status/${leaveId}?status=${status}`, {}, { headers });
  }
}
