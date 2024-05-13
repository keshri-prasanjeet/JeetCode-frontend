import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {Problem} from "../classes/problem";
import {AdminService} from "../services/admin.service";
import {ProblemsData} from "../classes/problems-data";

@Component({
  selector: 'app-problems-list-page',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './problems-list-page.component.html',
  styleUrls: ['./problems-list-page.component.scss']
})
export class ProblemsListPageComponent implements OnInit{

  problems:Problem[]=[];
  username:string = '';
  constructor(private adminService:AdminService, private router : Router) {
  }
  ngOnInit(): void {
    this.getProblemsData();
  }

  getProblemsData(): void {
    this.adminService.getProblems().subscribe({
      next: (response: ProblemsData) => {
        console.log(response);
        this.problems = response.problemsList;
        this.username = response.username;
        // Assuming you want to display or further process this.problems in your component
      },
      error: (error) => {
        console.error('Error fetching problems data:', error);
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
