import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';

// Import all the UI components this page uses
//import { StaticNavbarComponent } from '../../components/layout/StaticNavBar/staticnavbar.component';
import { NavBarComponent } from '../../components/layout/nav-bar/nav-bar.component';
import { ButtonComponent } from '../../components/ui/button/button.component';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule,
    //StaticNavbarComponent,
    ButtonComponent,
    NavBarComponent
  ],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingPageComponent {
  constructor(private router: Router) {}

  goToSignupPage(): void {
    // You could add other logic here before navigating
    console.log('Navigating to signup page...');
    this.router.navigate(['/signup']);
  }
  // All logic is currently handled in the template
}
