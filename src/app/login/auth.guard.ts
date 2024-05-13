// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService} from "../services/admin.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private adminService:AdminService) {}

  canActivate(): boolean {
    // Check your authentication logic here, and return true if the user is not logged in
    // For example, you can use a service that provides information about the user's login status
    const isLoggedIn = this.adminService.isLoggedIn(); // Replace this with your actual authentication check

    if (isLoggedIn) {
      // User is already logged in, navigate to some other route
      this.router.navigate(['/problems']);
      return false; // Prevent accessing the login route
    }

    return true; // Allow accessing the login route if the user is not logged in
  }
}
