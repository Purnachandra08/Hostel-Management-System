import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apply-leave.html',
  styleUrls: ['./apply-leave.css']
})
export class ApplyLeave {
  leave = {
    type: '',
    fromDate: '',
    toDate: '',
    reason: ''
  };

  // ✅ Fix: add this method
  onSubmit() {
    if (this.leave.type && this.leave.fromDate && this.leave.toDate && this.leave.reason) {
      alert(`Leave applied successfully for ${this.leave.type} from ${this.leave.fromDate} to ${this.leave.toDate}`);
      // You can later send this data to backend via API
      this.leave = { type: '', fromDate: '', toDate: '', reason: '' };
    } else {
      alert('Please fill in all fields before submitting.');
    }
  }
}
