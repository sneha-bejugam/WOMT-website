// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { FeatherModule } from 'angular-feather';

// @Component({
//   selector: 'app-login-page',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     FormsModule,
//     FeatherModule
//   ],
//   templateUrl: './login.component.html',
// })
// export class LoginPageComponent {
//   email = '';
//   password = '';
//   isLoading = false;

//   constructor(private router: Router) {}

//   handleSubmit(): void {
//     this.isLoading = true;
//     setTimeout(() => {
//       this.isLoading = false;
//       this.router.navigate(['/dashboard']);
//     }, 1500);
//   }
// }

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';

// Import all necessary Firebase services and functions
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FeatherModule
  ],
  templateUrl: './login.component.html',
})
export class LoginPageComponent {
  email = '';
  password = '';
  isLoading = false;
  errorMessage: string | null = null;

  // Inject Firebase Auth and Angular's Router
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  /**
   * Handles the email/password form submission.
   */
  async handleSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorMessage = "Please enter both email and password.";
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/dashboard']); // Navigate to dashboard on success
    } catch (error: any) {
      this.handleAuthError(error);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Handles the "Continue with Google" button click.
   */
  async signInWithGoogle(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(this.auth, provider);
      this.router.navigate(['/dashboard']); // Navigate to dashboard on success
    } catch (error: any) {
      this.handleAuthError(error);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * A helper function to display user-friendly error messages.
   */
  private handleAuthError(error: any): void {
    switch (error.code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        this.errorMessage = 'Invalid email or password. Please try again.';
        break;
      case 'auth/popup-closed-by-user':
        this.errorMessage = 'Sign-in process was cancelled.';
        break;
      default:
        this.errorMessage = 'An unexpected error occurred. Please try again.';
        break;
    }
    console.error('Authentication failed:', error);
  }
}
