import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AdminService} from "../services/admin.service";
import {MePageUserData} from "../classes/me-page-user-data";
import { LoadingService } from "../loading.service"; // Make sure to import this
import { SkeletonComponent } from "../skeleton/skeleton.component"; // Import the SkeletonComponent
import { Observable } from 'rxjs';
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [
    RouterLink,
    SkeletonComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit{
  mepageuserdata:MePageUserData = new MePageUserData();
  isLoading$: Observable<boolean>;

  constructor(
    private adminService:AdminService,
    private loadingService:LoadingService
  ) {
    this.isLoading$ = this.loadingService.getComponentLoading$('mePageUserData');
  }
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.loadingService.setComponentLoading('mePageUserData', true);
    this.adminService.getUserData().subscribe({
      next: (response: any)=>{
        console.log(response);
        this.mepageuserdata.emailId = response.emailId;
        this.mepageuserdata.fullName = response.fullName;
        this.loadingService.setComponentLoading('mePageUserData', false)
      },
      error: (error) => {
        console.error('Error fetching problems data:', error);
        this.loadingService.setComponentLoading('mePageUserData', false)
      },
    });
  }

  logout() {
    this.adminService.logout();
  }
}
