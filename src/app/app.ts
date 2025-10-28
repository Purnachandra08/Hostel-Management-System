import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Sidebar } from './shared/sidebar/sidebar';
import { Footer } from './shared/footer/footer';
import { CommonModule } from '@angular/common';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Sidebar, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  constructor(public auth: Auth) {} // public so template can use auth
}
