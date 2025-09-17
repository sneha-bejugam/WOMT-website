import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';

// Import all the UI components this page uses
//import { StaticNavbarComponent } from '../../components/layout/StaticNavBar/staticnavbar.component';
import { NavBarComponent } from '../../components/layout/nav-bar/nav-bar.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { FooterComponent } from "../../components/layout/footer/footer.component";
import { AvatarComponent } from '../../components/ui/avatar/avatar.component';

@Component({
  selector: 'app-solutions-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule,
    //StaticNavbarComponent,
    NavBarComponent,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    AvatarComponent,
    FooterComponent
],
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css']
})
export class SolutionsPageComponent {
  // Property to hold the current year for the footer copyright
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

//  studentStories = [
//     {
//       name: 'Priya Patel',
//       university: 'Marketing Professional',
//       country: 'India',
//       avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       testimonial: '"The smart pronunciation coach helped me communicate more clearly in meetings, while the business terminology lessons made it easier. I have gained confidence in presentations and networking events.'
//     },
//     {
//       name: 'Amina Ngoy',
//       university: 'International Development Specialist',
//       country: 'Democratic Republic of the Congo',
//       avatar: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       testimonial: '"The advanced speech training improved my clarity, while the business English modules transformed my communication. Interactive networking simulations prepared me well for professional conversations."'
//     },
//     {
//       name: 'Chinedu Okafor',
//       university: 'Senior Project Manager',
//       country: 'Nigeria',
//       avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       testimonial: '"The intelligent feedback system helped reduce misunderstandings in meetings, while the business writing modules polished my communication. I now lead conferences and office meetings with confidence."'
//     }
//   ];
  
  goToSignupPage(): void {
    // You could add other logic here before navigating
    console.log('Navigating to signup page...');
    this.router.navigate(['/signup']);
  }
}