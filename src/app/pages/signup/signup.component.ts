// import { Component , inject} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { FeatherModule } from 'angular-feather';

// // Import all the UI components this page uses
// import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
// import { Firestore, doc, setDoc } from '@angular/fire/firestore';

// import { ButtonComponent } from '../../components/ui/button/button.component';

// @Component({
//   selector: 'app-signup-page',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     FormsModule,
//     FeatherModule,
//     ButtonComponent
//   ],
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupPageComponent {
//   email = '';
//   password = '';
//   name = '';
//   isLoading = false;
//   errorMessage: string | null = null; // To display errors to the user

//   // Inject Firebase services and Angular's Router
//   private auth: Auth = inject(Auth);
//   private firestore: Firestore = inject(Firestore);
//   private router: Router = inject(Router);

//   // Method to handle form submission
//   async handleSubmit(): Promise<void> {
//     if (!this.name || !this.email || !this.password) {
//       this.errorMessage = "Please fill in all fields.";
//       return;
//     }

//     this.isLoading = true;
//     this.errorMessage = null;

//     try {
//       // 1. Create the user in Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
//       const user = userCredential.user;

//       // 2. Update the user's profile with their name
//       await updateProfile(user, { displayName: this.name });

//       // 3. Create a document in the 'users' collection in Firestore
//       const userDocRef = doc(this.firestore, `users/${user.uid}`);
//       await setDoc(userDocRef, {
//         uid: user.uid,
//         email: user.email,
//         displayName: this.name,
//         createdAt: new Date() // Good practice to store a timestamp
//       });

//       // 4. Navigate to the onboarding page on success
//       this.router.navigate(['/onboarding']);

//     } catch (error: any) {
//       // Handle different Firebase auth errors
//       switch (error.code) {
//         case 'auth/email-already-in-use':
//           this.errorMessage = 'This email address is already in use.';
//           break;
//         case 'auth/weak-password':
//           this.errorMessage = 'The password is too weak. It must be at least 6 characters long.';
//           break;
//         case 'auth/invalid-email':
//           this.errorMessage = 'The email address is not valid.';
//           break;
//         default:
//           this.errorMessage = 'An unexpected error occurred. Please try again.';
//           break;
//       }
//       console.error('Signup failed:', error);
//     } finally {
//       this.isLoading = false;
//     }
//   }
// }


import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';

// Import all necessary Firebase services and functions
import { Auth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, User, getAdditionalUserInfo, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

import { ButtonComponent } from '../../components/ui/button/button.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FeatherModule,
    ButtonComponent
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupPageComponent {
  email = '';
  password = '';
  name = '';
  terms = false;
  isLoading = false;
  errorMessage: string | null = null;

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);


  async handleSubmit(): Promise<void> {
    if (!this.name || !this.email || !this.password || !this.terms) {
      this.errorMessage = "Please fill in all fields and agree to the terms.";
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: this.name });
      await this.createUserDocument(user);
      this.router.navigate(['/onboarding']);
    } catch (error: any) {
      this.handleAuthError(error);
    } finally {
      this.isLoading = false;
    }
  }


  /**
   * Handles Google Sign-up.
   * Now checks if it's a new user before creating a document.
   */
  async signInWithGoogle(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(this.auth, provider);
      // **FIX: Check if the user is new**
      const additionalInfo = getAdditionalUserInfo(userCredential);

      if (additionalInfo?.isNewUser) {
        // This is a real new user, create their document
        await this.createUserDocument(userCredential.user);
        this.router.navigate(['/onboarding']);
      } else {
        // This user already exists, sign them out and show an error
        await signOut(this.auth);
        this.errorMessage = 'An account with this email already exists. Please sign in.';
      }
    } catch (error: any) {
      this.handleAuthError(error);
    } finally {
      this.isLoading = false;
    }
  }


  private async createUserDocument(user: User): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date()
    }, { merge: true });
  }


  /**
   * A helper function to display user-friendly error messages.
   * Added a case for existing accounts with different credentials.
   */
  private handleAuthError(error: any): void {
    switch (error.code) {
      // **FIX: Handle both error codes for existing accounts**
      case 'auth/email-already-in-use':
      case 'auth/account-exists-with-different-credential':
        this.errorMessage = 'This email address is already in use. Please sign in.';
        break;
      case 'auth/weak-password':
        this.errorMessage = 'The password is too weak. It must be at least 6 characters long.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'The email address is not valid.';
        break;
      case 'auth/popup-closed-by-user':
        this.errorMessage = 'Sign-up process was cancelled.';
        break;
      default:
        this.errorMessage = 'An unexpected error occurred. Please try again.';
        break;
    }
    console.error('Authentication failed:', error);
  }
}