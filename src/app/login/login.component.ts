import {Component, ElementRef, HostListener, NgZone, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AdminDetail } from '../classes/admin-detail';
import { AdminService } from '../services/admin.service';
import {Router, RouterLink} from '@angular/router';
import {JsonPipe, NgIf} from "@angular/common";
import {NgxTypedJsModule} from "ngx-typed-js";
import { AuthGuard } from "./auth.guard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgIf,
    RouterLink,
    NgxTypedJsModule
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private adminDetail: AdminDetail = new AdminDetail();
  @ViewChild('div', {static: false}) div!:ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('subButton') submitButton!: ElementRef;
  @ViewChild('resetButton') resetButton!: ElementRef;

  backgroundValue = '';
  constructor(
    private adminService: AdminService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private elRef: ElementRef,
    private ngZone: NgZone
  ) {
  }
  formVisible: boolean = false;
  cursorStatus: boolean = true;
  showEmailInput:boolean = false;
  showPasswordInput: boolean = false;
  showConfirmPasswordInput: boolean = false;
  showButton: boolean = false;
  showUserNameInput:boolean = false;
  firstFocus:boolean= false;
  OnCancel:boolean = false;//flag to check if focus is on Cancel button
  OnSubmit:boolean =false;//flag to check if focus is on submit button
  failedLogin:boolean = false;
  LoginFormSubmit(value: any) {
    console.log(value);
    this.adminDetail.emailId = value.emailId;
    this.adminDetail.password = value.password;
    this.adminDetail.fullName = value.fullName;

    this.adminService.login(this.adminDetail).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response && response.jwtToken) {
          console.log("Token received from server on login:", response.jwtToken);

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

  typingComplete() {
    this.cursorStatus=false;
  }


  @HostListener('window:keyup',['$event'])
  handleKeyDown(event: KeyboardEvent) {
    console.log("this Host listener is triggered");
    // console.log(document.activeElement);
    // console.log("is the active element")
    if (event.key === 'Enter') {
      this.formVisible = true;
      console.log("Host listener is triggered")
      this.showUserNameInput = true;
      if(this.firstFocus===false)
        setTimeout(() => {
          // Focus on the username input
          this.renderer.selectRootElement('#fullName').focus();
          this.firstFocus = true;
        });
    }
    else if(event.key === 'ArrowLeft' && this.showButton && !this.OnCancel){
      setTimeout(() => {
        // Focus on the email input
        // this.renderer.selectRootElement('subButton').focus();
        this.resetButton.nativeElement.focus();
        this.OnCancel = true;
        this.OnSubmit = false;
      });
    }
    else if(event.key === 'ArrowRight' && this.showButton && !this.OnSubmit){
      setTimeout(() => {
        // Focus on the email input
        // this.renderer.selectRootElement('subButton').focus();
        this.submitButton.nativeElement.focus();
        this.OnCancel = false;
        this.OnSubmit = true;
      });
    }
  }

  handleUsernameEnter() {
    this.showPasswordInput = true;
    setTimeout(() => {
      // Focus on the email input
      this.renderer.selectRootElement('#password').focus();
    });
  }

  handlePasswordEnter() {
    this.showButton = true;
    setTimeout(() => {
      // Focus on the email input
      // this.renderer.selectRootElement('subButton').focus();
      this.submitButton.nativeElement.focus();
      this.OnSubmit = true;
    });
  }

  handleFormKeydown(event: any) {
    if (this.showButton) {
      return;
    }
    else {
      event.preventDefault();
    }
  }
  handleResetClick() {
    this.showEmailInput = false;
    this.showPasswordInput = false;
    this.showConfirmPasswordInput = false;
    this.showButton = false;
    this.showUserNameInput = false;
    this.OnSubmit = false;
    this.OnCancel = false;
    this.formVisible = false;
    this.firstFocus = false;
  }
}

