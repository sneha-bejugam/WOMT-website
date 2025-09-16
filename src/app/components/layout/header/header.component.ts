import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Needed for routerLink
import { CommonModule } from '@angular/common'; // Needed for *ngIf

// Import the icon module
import { FeatherModule } from 'angular-feather';

import { User } from '../../../core/models/type';
import { DataService } from '../../../core/services/data.service';
import { AvatarComponent } from '../../ui/avatar/avatar.component'; 
// Import the standalone Avatar component

@Component({
  selector: 'app-header',
  standalone: true, // <-- Make the component standalone
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule, // <-- Import the icon module here
    AvatarComponent // <-- Import the child component here
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // This emits an event to the parent component, replacing the toggleSidebar function prop
  @Output() sidebarToggled = new EventEmitter<void>();

  // Holds the user data fetched from the service
  currentUser!: User;

  // Inject the DataService to get mock data
  constructor(private dataService: DataService, private router: Router) { }

  // ngOnInit is a lifecycle hook that runs once, after the component is created
  ngOnInit(): void {
    this.currentUser = this.dataService.getCurrentUser();
  }

  // This method is called when the menu button is clicked in the template
  onToggleSidebar(): void {
    this.sidebarToggled.emit();
  }

  gotouserprofile(): void {
    this.router.navigate(['/userprofile']);
 }
}
