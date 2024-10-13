import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AdminService } from '../services/admin.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-small-screen-signup',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './small-screen-signup.component.html',
  styleUrls: ['./small-screen-signup.component.scss'],
})
export class SmallScreenSignupComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  adminFormSubmit() {
    this.errorMessage = ''; // Reset error message before submission

    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    const adminDetail = {
      fullName: this.fullName,
      emailId: this.email,
      password: this.password
    };

    this.adminService.saveAdminDetails(adminDetail).subscribe({
      next: response => {
        if (response.message === 'Registration successful') {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = "Unexpected response from server. Please try again.";
        }
      },
      error: error => {
        const errorMsg = error.error?.message || 'An error occurred during registration.';
        this.errorMessage = errorMsg;
      }
    });
  }
}
