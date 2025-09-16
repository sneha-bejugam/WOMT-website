import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';

// Import all the UI components this page uses
//import { StaticNavbarComponent } from '../../components/layout/StaticNavBar/staticnavbar.component';
import { NavBarComponent } from '../../components/layout/nav-bar/nav-bar.component';
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';


@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule,
    //StaticNavbarComponent,
    CardComponent,
    CardContentComponent,
    ButtonComponent,
    FooterComponent,
    NavBarComponent
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutPageComponent {
  // Property to hold the current year for the footer copyright
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

 
  goToSignupPage(): void {
    // You could add other logic here before navigating
    console.log('Navigating to signup page...');
    this.router.navigate(['/signup']);
  }
}
