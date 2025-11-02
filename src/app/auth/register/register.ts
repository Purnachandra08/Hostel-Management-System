import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  model = {
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'student'
  };

  message: string = '';
  error: string = '';
  private baseUrl = 'http://localhost:8080/api/auth/register';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.message = '';

    const payload = {
      fullName: this.model.fullName,
      username: this.model.username,
      email: this.model.email,
      phone: this.model.phone,
      password: this.model.password,
      roles: [{ name: this.model.role.toUpperCase() }]
    };

    console.log('📤 Sending registration payload:', payload);

    this.http.post(this.baseUrl, payload).subscribe({
      next: (res: any) => {
        console.log('✅ Registration successful:', res);
        this.message = 'Registration successful! Redirecting...';

        // ✅ Redirect based on role after 1.5s
        setTimeout(() => {
          const role = this.model.role.toLowerCase();
          if (role === 'student') {
            this.router.navigate(['/student/dashboard']);
          } else if (role === 'warden') {
            this.router.navigate(['/warden/dashboard']);
          } else if (role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/login']);
          }
        }, 1500);
      },
      error: (err) => {
        console.error('❌ Registration failed:', err);
        if (err.error?.message) {
          this.error = err.error.message;
        } else if (typeof err.error === 'string') {
          this.error = err.error;
        } else {
          this.error = 'Registration failed. Please try again.';
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
