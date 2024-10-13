import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class SpinGuard implements CanActivate {
  constructor(private loadingService: LoadingService, private router: Router) {}

  canActivate(): boolean {
    // Always redirect to home when trying to access /spin directly
    this.router.navigate(['/home']); // Change to your desired route
    return false;
  }
}
