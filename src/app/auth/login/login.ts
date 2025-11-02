import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  credentials = { username: '', password: '' };
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  onSubmit() {
    this.auth.login(this.credentials.username, this.credentials.password).subscribe({
      next: (res) => {
        console.log('✅ Login response:', res);

        const role = (res.role || '').toUpperCase();

        // ✅ Store token, role, and user details
        this.auth.storeRole(role);
        this.auth.storeToken(res.token || '');
        localStorage.setItem('user', JSON.stringify(res));

        // ✅ Redirect based on user role
        if (role === 'STUDENT' || role === 'USER') {
          console.log('➡ Redirecting to /student');
          this.router.navigate(['/student']);
        } else if (role === 'WARDEN' || role === 'MANAGER') {
          console.log('➡ Redirecting to /warden');
          this.router.navigate(['/warden']);
        } else if (role === 'ADMIN') {
          console.log('➡ Redirecting to /admin');
          this.router.navigate(['/admin']);
        } else {
          this.error = '❌ Unknown user role';
          console.error(this.error);
        }
      },
      error: (err) => {
        console.error('❌ Login error:', err);
        this.error = 'Invalid username or password';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
