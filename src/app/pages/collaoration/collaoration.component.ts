import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { FeatherModule } from 'angular-feather';

// Import all the UI components this page uses
//import { StaticNavbarComponent } from '../../components/layout/StaticNavBar/staticnavbar.component';
import { NavBarComponent } from '../../components/layout/nav-bar/nav-bar.component';
import { CardComponent } from '../../components/ui/card/card.component';
import { CardContentComponent } from '../../components/ui/card/card-content/card-content.component';
import { ButtonComponent } from '../../components/ui/button/button.component';

@Component({
  selector: 'app-collaboration-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, // Add FormsModule to imports
    FeatherModule,
    //StaticNavbarComponent,
    CardComponent,
    CardContentComponent,
    ButtonComponent,
    NavBarComponent
  ],
  templateUrl: './collaoration.component.html',
  styleUrls: ['./collaoration.component.css']
})
export class CollaborationPageComponent {
  showContactForm = false;
  isSubmitted = false;
  currentYear = new Date().getFullYear();

  // Data model for the form
  formData = {
    fullName: '',
    organizationType: '',
    organizationName: '',
    email: '',
    phone: '',
    objectives: ''
  };

  // Method to open the contact form modal
  openContactForm(): void {
    this.showContactForm = true;
    this.isSubmitted = false; // Reset submission status
  }

  // Method to close the contact form modal
  closeContactForm(): void {
    this.showContactForm = false;
  }

  // Method to handle form submission
  handleSubmit(): void {
    console.log('Form Submitted:', this.formData);
    this.isSubmitted = true;
    // Reset form after a delay to show success message
    setTimeout(() => {
        this.closeContactForm();
        this.resetForm();
    }, 3000);
  }

  // Helper method to reset the form data
  private resetForm(): void {
    this.formData = {
      fullName: '',
      organizationType: '',
      organizationName: '',
      email: '',
      phone: '',
      objectives: ''
    };
  }
}
