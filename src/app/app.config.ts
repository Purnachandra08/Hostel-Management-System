import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

// ✅ Public Components
import { LandingComponent } from './pages/landing/landing';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

// 🧑‍🎓 Student Components
import { StudentDashboard } from './student/student-dashboard/student-dashboard';
import { ApplyLeave } from './student/apply-leave/apply-leave';
import { Complaints } from './student/complaints/complaints';
import { ViewProfile } from './student/view-profile/view-profile';
import { BookRoom } from './student/book-room/book-room';

// 🧑‍🏫 Warden Components
import { WardenDashboard } from './warden/warden-dashboard/warden-dashboard';
import { MarkAttendance } from './warden/mark-attendance/mark-attendance';
import { LeaveApproval } from './warden/leave-approval/leave-approval';
import { WardenComplaints } from './warden/warden-complaints/warden-complaints';

// 🧑‍💼 Admin Components
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { ManageRooms } from './admin/manage-rooms/manage-rooms';
import { ManageStudents } from './admin/manage-students/manage-students';

// ✅ Guards
import { studentGuard, wardenGuard, adminGuard } from './guards';

// ===============================
// ✅ Define All Routes (Nested per Role)
// ===============================
export const routes: Routes = [
  // 🌐 Public Routes
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // 🧑‍🎓 Student Routes
  {
    path: 'student',
    canActivate: [studentGuard],
    children: [
      { path: '', component: StudentDashboard },
      { path: 'apply-leave', component: ApplyLeave },
      { path: 'complaints', component: Complaints },
      { path: 'view-profile', component: ViewProfile },
      { path: 'book-room', component: BookRoom }
    ]
  },

  // 🧑‍🏫 Warden Routes
  {
    path: 'warden',
    canActivate: [wardenGuard],
    children: [
      { path: '', component: WardenDashboard },
      { path: 'mark-attendance', component: MarkAttendance },
      { path: 'leave-approval', component: LeaveApproval },
      { path: 'complaints', component: WardenComplaints }
    ]
  },

  // 🧑‍💼 Admin Routes
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', component: AdminDashboard },
      { path: 'manage-rooms', component: ManageRooms },
      { path: 'manage-students', component: ManageStudents }
    ]
  },

  // 🚫 Wildcard Route
  { path: '**', redirectTo: 'login' }
];

// ===============================
// ✅ Final Application Config
// ===============================
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch())
  ]
};
