import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { LoadingService } from './loading.service';
import { slideInAnimation } from "./animation";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'JeetCode';
  isLoading$: Observable<boolean>;

  constructor(public router: Router, public loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.isLoading$;

    this.router.events.subscribe((event: any): void => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingService.setLoading(true);
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingService.setLoading(false);
      }
    });
  }
}
