import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-rooms.html',
  styleUrls: ['./manage-rooms.css']
})
export class ManageRooms {
  rooms = [
    { number: '101', capacity: 3, occupied: 2 },
    { number: '102', capacity: 2, occupied: 2 },
    { number: '103', capacity: 4, occupied: 1 },
    { number: '104', capacity: 1, occupied: 0 },
  ];

  newRoom = { number: '', capacity: 0, occupied: 0 };

  addRoom() {
    if (this.newRoom.number && this.newRoom.capacity > 0) {
      this.rooms.push({ ...this.newRoom });
      this.newRoom = { number: '', capacity: 0, occupied: 0 };
      alert('✅ Room added successfully!');
    } else {
      alert('⚠️ Please enter valid room details.');
    }
  }

  deleteRoom(index: number) {
    if (confirm('Are you sure you want to delete this room?')) {
      this.rooms.splice(index, 1);
    }
  }
}
