import { Router, RouterLink } from "@angular/router";
import { NgForOf, NgIf, AsyncPipe } from "@angular/common";
import { Problem } from "../classes/problem";
import { AdminService } from "../services/admin.service";
import { ProblemsData } from "../classes/problems-data";
import { LoadingService } from "../loading.service"; // Make sure to import this
import { SkeletonComponent } from "../skeleton/skeleton.component"; // Import the SkeletonComponent
import { Observable } from 'rxjs';
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-problems-list-page',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    AsyncPipe,
    SkeletonComponent // Add this to the imports
  ],
  templateUrl: './problems-list-page.component.html',
  styleUrls: ['./problems-list-page.component.scss']
})
export class ProblemsListPageComponent implements OnInit {
  problems: Problem[] = [];
  username: string = '';
  isLoading$: Observable<boolean>;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.isLoading$ = this.loadingService.getComponentLoading$('problemsList');
  }

  ngOnInit(): void {
    this.getProblemsData();
  }

  getProblemsData(): void {
    this.loadingService.setComponentLoading('problemsList', true);
    this.adminService.getProblems().subscribe({
      next: (response: ProblemsData) => {
        console.log(`
▗▖ ▗▖▗▄▄▄▖▗▖    ▗▄▄▖ ▗▄▖ ▗▖  ▗▖▗▄▄▄▖    ▗▄▄▄▖▗▄▖        ▗▖▗▄▄▄▖▗▄▄▄▖▗▄▄▄▖▗▄▄▖ ▗▄▖ ▗▄▄▄ ▗▄▄▄▖
▐▌ ▐▌▐▌   ▐▌   ▐▌   ▐▌ ▐▌▐▛▚▞▜▌▐▌         █ ▐▌ ▐▌       ▐▌▐▌   ▐▌     █ ▐▌   ▐▌ ▐▌▐▌  █▐▌
▐▌ ▐▌▐▛▀▀▘▐▌   ▐▌   ▐▌ ▐▌▐▌  ▐▌▐▛▀▀▘      █ ▐▌ ▐▌       ▐▌▐▛▀▀▘▐▛▀▀▘  █ ▐▌   ▐▌ ▐▌▐▌  █▐▛▀▀▘
▐▙█▟▌▐▙▄▄▖▐▙▄▄▖▝▚▄▄▖▝▚▄▞▘▐▌  ▐▌▐▙▄▄▖      █ ▝▚▄▞▘    ▗▄▄▞▘▐▙▄▄▖▐▙▄▄▖  █ ▝▚▄▄▖▝▚▄▞▘▐▙▄▄▀▐▙▄▄▖
        `);
        this.problems = response.problemsList;
        this.username = response.username;
        this.loadingService.setComponentLoading('problemsList', false);
      },
      error: (error) => {
        console.error('Error fetching problems data:', error);
        this.loadingService.setComponentLoading('problemsList', false);
        this.adminService.logout();
        this.router.navigate(['/home']);
      },
    });
  }

  logout() {
    this.adminService.logout();
  }

  solveProblem(problemId: string) {
    this.router.navigate(['problemsdfsdf', problemId]);
  }

  onSolveButtonClick(problemId: string) {
    this.router.navigate(['/problem', problemId]);
  }

  onSubmissionsButtonClick(problemId: string) {
    this.router.navigate(['/submission', problemId]);
  }
}
