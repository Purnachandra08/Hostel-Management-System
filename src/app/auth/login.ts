import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  model = { role: 'STUDENT', email: '', password: '' };
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  onSubmit() {
    // For real: call auth.login(). For now mock login.
    this.auth.loginMock(this.model.role as 'STUDENT'|'WARDEN'|'ADMIN');
    this.auth.storeRole(this.model.role as any);
    // navigate to role dashboard
    if (this.model.role === 'STUDENT') this.router.navigate(['/student']);
    else if (this.model.role === 'WARDEN') this.router.navigate(['/warden']);
    else this.router.navigate(['/admin']);
  }
}
