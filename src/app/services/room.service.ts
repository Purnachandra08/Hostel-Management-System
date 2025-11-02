import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private baseUrl = 'http://localhost:8080/api/rooms';

  constructor(private http: HttpClient) {}

  // ✅ Fetch available rooms (status = AVAILABLE)
  getAvailableRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/available`);
  }
}
