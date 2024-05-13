import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxTypedJsModule} from "ngx-typed-js";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxTypedJsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected readonly toString = toString;
}
