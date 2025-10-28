import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { LandingComponent } from './pages/landing/landing';
import { Login } from './auth/login';
import { Register } from './auth/register';
import { StudentDashboard } from './student/student-dashboard/student-dashboard';
import { ApplyLeave } from './student/apply-leave/apply-leave';
import { Complaints } from './student/complaints/complaints';
import { WardenDashboard } from './warden/warden-dashboard/warden-dashboard';
import { MarkAttendance } from './warden/mark-attendance/mark-attendance';
import { LeaveApproval } from './warden/leave-approval/leave-approval';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { ManageRooms } from './admin/manage-rooms/manage-rooms';
import { ManageStudents } from './admin/manage-students/manage-students';

import { studentGuard, wardenGuard, adminGuard } from './guards';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // student routes (guarded)
  { path: 'student', component: StudentDashboard, canActivate: [studentGuard] },
  { path: 'student/apply-leave', component: ApplyLeave, canActivate: [studentGuard] },
  { path: 'student/complaints', component: Complaints, canActivate: [studentGuard] },

  // warden routes
  { path: 'warden', component: WardenDashboard, canActivate: [wardenGuard] },
  { path: 'warden/mark-attendance', component: MarkAttendance, canActivate: [wardenGuard] },
  { path: 'warden/leave-approval', component: LeaveApproval, canActivate: [wardenGuard] },

  // admin routes
  { path: 'admin', component: AdminDashboard, canActivate: [adminGuard] },
  { path: 'admin/manage-rooms', component: ManageRooms, canActivate: [adminGuard] },
  { path: 'admin/manage-students', component: ManageStudents, canActivate: [adminGuard] },

  { path: '**', redirectTo: 'landing' }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
