import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-wardens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-wardens.html',
  styleUrls: ['./manage-wardens.css']
})
export class ManageWardens {

  wardens = [
    { name: 'Ramesh Kumar', email: 'ramesh@hostelease.com', hostel: 'Boys Hostel A' },
    { name: 'Sunita Sharma', email: 'sunita@hostelease.com', hostel: 'Girls Hostel B' }
  ];

  newWarden = {
    name: '',
    email: '',
    hostel: ''
  };

  addWarden() {
    if (this.newWarden.name && this.newWarden.email && this.newWarden.hostel) {
      this.wardens.push({ ...this.newWarden });
      this.newWarden = { name: '', email: '', hostel: '' };
    }
  }

  deleteWarden(index: number) {
    this.wardens.splice(index, 1);
  }
}
