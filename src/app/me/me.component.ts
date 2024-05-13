import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AdminService} from "../services/admin.service";
import {MePageUserData} from "../classes/me-page-user-data";
@Component({
  selector: 'app-me',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit{
  mepageuserdata:MePageUserData = new MePageUserData();
  test:string = '';
  constructor(private adminService:AdminService) {
  }
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.adminService.getUserData().subscribe({
      next: (response: any)=>{
        console.log(response);
        this.mepageuserdata.emailId = response.emailId;
        this.mepageuserdata.fullName = response.fullName;
      },
      error: (error) => {
        console.error('Error fetching problems data:', error);
      },
    });
  }

  logout() {
    this.adminService.logout();
  }
}
