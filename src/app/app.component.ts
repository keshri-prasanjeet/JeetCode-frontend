import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';
import {Router, RouteConfigLoadStart, RouteConfigLoadEnd} from '@angular/router';
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {slideInAnimation} from "./animation";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'JeetCode V2';
  isLoading: boolean = false;

  constructor(public router: Router,
              private contexts: ChildrenOutletContexts) {
    this.router.events.subscribe(
      (event: any): void => {
        if (event instanceof RouteConfigLoadStart) {
          this.isLoading = true;
        } else if (event instanceof RouteConfigLoadEnd) {
          this.isLoading = false;
        }
      }
    );
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
