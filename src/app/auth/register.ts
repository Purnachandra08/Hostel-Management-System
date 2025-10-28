import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  model = { role: 'STUDENT', name: '', email: '', password: '' };

  constructor(private auth: Auth, private router: Router) {}

  onSubmit() {
    // For demo registerMock and login
    this.auth.registerMock(this.model.role as any);
    this.auth.storeRole(this.model.role as any);
    if (this.model.role === 'STUDENT') this.router.navigate(['/student']);
    else if (this.model.role === 'WARDEN') this.router.navigate(['/warden']);
    else this.router.navigate(['/admin']);
  }
}
