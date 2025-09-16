import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';

// Define a type for our navigation items for better type safety
type NavItem = {
  name: string;
  icon: string; // We store the icon name as a string
  path: string;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,   // For *ngFor, ngClass
    RouterModule,   // For routerLink, routerLinkActive
    FeatherModule   // For <i-feather> icons
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  // @Input() allows the parent component to pass the 'isOpen' state down
  @Input() isOpen: boolean = false;

  // The navigation items array, matching the image design
  navItems: NavItem[] = [
    { name: 'Dashboard', icon: 'home', path: '/dashboard' },
    { name: 'Lessons', icon: 'book-open', path: '/lessons' },
    { name: 'Translate', icon: 'shuffle', path: '/translate' },
    { name: 'Fluent Frontier', icon: 'globe', path: '/fluent-frontier' },
    { name: 'Chat Practice', icon: 'message-circle', path: '/chat' },
    { name: 'Progress', icon: 'bar-chart', path: '/progressbar' },
    { name: 'Settings', icon: 'settings', path: '/settings' },
  ];

  constructor(private router: Router) { }

  // A method to handle the logout action
  logout(): void {
    console.log('Logout action triggered!');
    this.router.navigate(['/home']);

    // Add actual logout logic here (e.g., call an authentication service)
  }
}
