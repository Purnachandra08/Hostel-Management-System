import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Warden {
  private baseUrl = 'http://localhost:8080/api/warden';

  constructor(private http: HttpClient) {}

  getComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/complaints`);
  }

  getLeaves(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/leaves`);
  }

  approveLeave(id: number): Observable<any> {
    // ✅ Changed PUT → POST
    return this.http.post(`${this.baseUrl}/leaves/${id}/approve`, {});
  }

  rejectLeave(id: number): Observable<any> {
    // ✅ Changed PUT → POST
    return this.http.post(`${this.baseUrl}/leaves/${id}/reject`, {});
  }

  approveComplaint(id: number): Observable<any> {
    // ✅ Changed PUT → POST (if you use /resolve endpoint)
    return this.http.post(`${this.baseUrl}/complaints/${id}/resolve`, {});
  }

  rejectComplaint(id: number): Observable<any> {
    // 🔹 If reject endpoint doesn’t exist, you can skip or add in backend later
    return this.http.post(`${this.baseUrl}/complaints/${id}/reject`, {});
  }
}
