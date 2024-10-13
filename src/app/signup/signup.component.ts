import {Component, OnInit, ViewChild, HostListener, AfterViewInit, NgZone} from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf, NgStyle} from "@angular/common";
import {AdminDetail} from "../classes/admin-detail";
import {AdminService} from "../services/admin.service";
import {Router, RouterLink} from "@angular/router";
import {NgxTypedJsModule} from "ngx-typed-js";
import { SmallScreenSignupComponent } from '../small-screen-signup/small-screen-signup.component'; // Correct path

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    NgStyle,
    NgxTypedJsModule,
    [SmallScreenSignupComponent]
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit{

  isKeyboardAttached: boolean = false;
  private adminDetail: AdminDetail = new AdminDetail();
  @ViewChild('div', {static: false}) div!:ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('subButton') submitButton!: ElementRef;
  @ViewChild('resetButton') resetButton!: ElementRef;

  backgroundValue = '';

  ngOnInit(): void {
    // Detect if a keyboard is attached (or use custom logic)
    this.checkForKeyboard();
  }

  checkForKeyboard(): void {
    // This is a very basic way to check for keyboard; you might want to improve detection based on your requirements
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.isKeyboardAttached = !isTouchDevice;
  }
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
  AdminFormSubmit(formData: any) {

    this.adminDetail.fullName = formData.fullName;
    this.adminDetail.password = formData.password;
    this.adminDetail.emailId = formData.email;
    //console.log(this.adminDetail);
    this.adminService.saveAdminDetails(this.adminDetail).subscribe({
        next: response => {
          let result = response;
          //console.log("Response from server:", response);
          // Check for success based on the response structure
          if (result.message === 'Registration successful') {
            this.router.navigate(['/login']);
          } else {
            alert("Unexpected response from server. Please try after sometime.");
          }
        },
        error: error => {
          console.error("Error from server:", error);
          // Display the error message from the server if available
          const errorMessage = error.error && error.error.message ? error.error.message : 'An error occurred during registration.';
          alert(errorMessage);
        }
      }
    );
  }

  typingComplete() {
    this.cursorStatus=false;
  }


  @HostListener('window:keyup',['$event'])
  handleKeyDown(event: KeyboardEvent) {
    //console.log("this Host listener is triggered");
    //console.log(document.activeElement);
    //console.log("is the active element")
    if (event.key === 'Enter') {
      this.formVisible = true;
      //console.log("Host listener is triggered")
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
    this.showEmailInput = true;
    //console.log("hello there");
    setTimeout(() => {
      // Focus on the email input
      this.renderer.selectRootElement('#email').focus();
    });
  }

  handleEmailEnter() {
    this.showPasswordInput = true;
    setTimeout(() => {
      // Focus on the email input
      this.renderer.selectRootElement('#password').focus();
    });
  }

  handlePasswordEnter() {
    this.showConfirmPasswordInput = true;
    setTimeout(() => {
      // Focus on the email input
      this.renderer.selectRootElement('#confirmPassword').focus();
    });
  }

  handleConfirmPasswordEnter() {
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










