import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router} from '@angular/router';
import { FeatherModule } from 'angular-feather';

// Import UI Components
import { NavBarComponent } from '../../components/layout/nav-bar/nav-bar.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';
import { AvatarComponent } from '../../components/ui/avatar/avatar.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule,
    NavBarComponent,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    AvatarComponent,
    FooterComponent
  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentsComponent {
  constructor(private router: Router) {}

  studentStories = [
    {
      name: 'Rahul Sharma',
      university: 'Oxford University',
      country: 'India',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      testimonial: '"The smart pronunciation trainer helped me identify and fix my speaking patterns. After practicing with the real-world scenarios, I can now confidently participate in networking events."'
    },
    {
      name: 'Zhang Wei',
      university: 'MIT',
      country: 'China',
      avatar: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      testimonial: '"The personalized feedback system helped me master challenging sounds like \'r\' and \'l\'. The cultural lessons taught me American conversation skills, making me feel at home in social settings."'
    },
    {
      name: 'Camille Beauchamp',
      university: 'Boston University',
      country: 'Quebec, Canada',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      testimonial: '"The advanced pronunciation training helped me refine my French accent while keeping my authenticity. The Fluent Frontier game was one of the most fun parts of my preparation for MBA discussions and networking."'
    }
  ];
   goToSignupPage(): void {
    // You could add other logic here before navigating
    console.log('Navigating to signup page...');
    this.router.navigate(['/signup']);
  }
}
