import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
     CommonModule,
   RouterModule,
   FeatherModule,

  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number;
 
  constructor() {
    this.currentYear = new Date().getFullYear();
}
}
