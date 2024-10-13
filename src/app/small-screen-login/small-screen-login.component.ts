import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AdminService } from '../services/admin.service';
import {NgIf} from "@angular/common";
import {AdminDetail} from "../classes/admin-detail";

@Component({
  selector: 'app-small-screen-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './small-screen-login.component.html',
  styleUrls: ['./small-screen-login.component.scss'],
})
export class SmallScreenLoginComponent {
  private adminDetail: AdminDetail = new AdminDetail();
  failedLogin:boolean = false;
  errorMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  LoginFormSubmit(value: any) {
    // console.log(value);
    this.adminDetail.emailId = value.emailId;
    this.adminDetail.password = value.password;
    this.adminDetail.fullName = value.fullName;

    this.adminService.login(this.adminDetail).subscribe({
      next: (response: any) => {
        // console.log(response);
        if (response && response.jwtToken) {
          // console.log("Token received from server on login:", response.jwtToken);

          const jwtToken = response.jwtToken;
          localStorage.setItem('JWT', jwtToken);
          this.router.navigateByUrl('/problems');
          // Redirect or perform other actions based on successful login
        } else {
          console.log("Unexpected response from server:", response);
        }
      },
      error: (err) => {
        console.error("Error during login:", err);
        this.failedLogin = true;
        // Handle the error, display a message, or redirect as needed
      },
    });
  }
}
