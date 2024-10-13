import { Component } from '@angular/core';
import { LoadingService } from '../loading.service'; // Adjust the path accordingly

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  standalone: true,
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  title: string | undefined; // Define title

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.setLoading(true); // Start loading on initialization
  }

  ngOnDestroy() {
    this.loadingService.setLoading(false); // Stop loading on destroy
  }
}
