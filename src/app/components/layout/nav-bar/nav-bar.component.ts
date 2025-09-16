// import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { FeatherModule } from 'angular-feather';

// @Component({
//   selector: 'app-nav-bar',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     FeatherModule,
//     // ButtonComponent
//   ],
//   templateUrl: './nav-bar.component.html',
//   styleUrl: './nav-bar.component.css'
// })
// export class NavBarComponent {

// // Assuming a standalone ButtonComponent exists
// // import { ButtonComponent } from '../../ui/button/button.component';


//   isMenuOpen = false;
//   solutionsDropdownOpen = false;

//   // Use @ViewChild to get a reference to the dropdown element in the template
//   @ViewChild('solutionsDropdown') solutionsDropdownRef!: ElementRef;

//   constructor(private elementRef: ElementRef) {}

//   // @HostListener listens for global events on the document
//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: MouseEvent) {
//     // Check if the dropdown is open and the click was outside of it
//     if (this.solutionsDropdownOpen && !this.solutionsDropdownRef.nativeElement.contains(event.target)) {
//       this.solutionsDropdownOpen = false;
//     }
//     this.solutionsDropdownOpen = false;
 
//   }

//   toggleMenu(): void {
//     this.isMenuOpen = !this.isMenuOpen;
//   }

//   // Stop propagation to prevent the document click listener from firing
//   toggleSolutionsDropdown(event: MouseEvent): void {
//     event.stopPropagation();
//     this.solutionsDropdownOpen = !this.solutionsDropdownOpen;
   
//   }

//   closeAllMenus(): void {
//     this.isMenuOpen = false;
//     this.solutionsDropdownOpen = false;
//   }
// }

import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
// Assuming ButtonComponent might be used in the future
// import { ButtonComponent } from '../../ui/button/button.component'; 

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeatherModule,
    // ButtonComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false;
  solutionsDropdownOpen = false;

  // Use @ViewChild to get a reference to the dropdown element in the template
  @ViewChild('solutionsDropdown') solutionsDropdownRef!: ElementRef;

  constructor(private elementRef: ElementRef) {}

  // @HostListener listens for global events on the document
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Check if the dropdown is open and the click was outside of it
    if (this.solutionsDropdownOpen && 
        this.solutionsDropdownRef && 
        !this.solutionsDropdownRef.nativeElement.contains(event.target)) {
      this.solutionsDropdownOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Stop propagation to prevent the document click listener from firing immediately
  toggleSolutionsDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.solutionsDropdownOpen = !this.solutionsDropdownOpen;
  }

  closeAllMenus(): void {
    this.isMenuOpen = false;
    this.solutionsDropdownOpen = false;
  }
}
