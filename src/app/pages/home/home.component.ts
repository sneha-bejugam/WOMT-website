import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';


import { NavBarComponent } from '../../components/layout/nav-bar/nav-bar.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule,
    //StaticNavbarComponent,
    NavBarComponent,
    ButtonComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
})
export class HomePageComponent {
  currentYear = new Date().getFullYear();

 
  constructor(private router: Router) {}

 
  goToSignupPage(): void {
   
    console.log('Navigating to signup page...');
    this.router.navigate(['/signup']);
  }
}
